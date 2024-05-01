import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
import { onMounted } from 'vue';
import { dateARG } from '../utils';

export const useBarChartTwoSizes = (options = {}) => {
    const {
        data = [],
        node = null,
        width = 800,
        defaultHeight = 700,
        smallHeight = 1200,
        offsetX = 100,
        offsetBottom = 50,
        offsetTop = 20,
        paddingFactor = 0.5,
        isSmall = null,
        verticalAxisPrecision = 1
    } = options;

    if (!node) {
        throw new Error('You need to pass a not null ref to useBarsDiagram composable');
    }

    if (!Array.isArray(data)) {
        throw new Error('useBarsDiagram composable needs to be passed an array as data argument');
    }

    // First datum
    const height = isSmall ? smallHeight : defaultHeight;
    const initDate = new Date(data[0].date);
    const initVariation = data[0].varMonth;
    const verticalScale = d3.scaleLinear([0, initVariation], [height - offsetBottom, offsetTop]).nice();
    const yAxis = d3.axisLeft(verticalScale).ticks(4).tickFormat(verticalScale => verticalScale.toFixed(verticalAxisPrecision));
    const bandScale = d3.scaleBand([dateARG(initDate)], [offsetX, width - offsetX]).paddingOuter(paddingFactor);
    const xAxis = d3.axisBottom(bandScale).tickFormat((d,i) => getTickLabel(i, 0)).tickSizeOuter(0);
    const svg = d3.create('svg')
        .attr('class', 'chart-container')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;');

    const getTransition = () => svg.transition().duration(300).ease(d3.easeCubicOut);

    const getTickLabel = (tickIndex, dataIndex) => {
        const { monthShort, year } = data[tickIndex];

        if (monthShort.toUpperCase() === 'DIC') {
            return Number(year);
        }

        if (Number(dataIndex) > 12) {
            return '';
        }
    };

    const addRuler = (y, svg) => {
        const data = d3.selectAll('g.bars').selectAll('rect').data();
        const {
            varMonth,
            monthShort,
            year,
        } = data[data.length - 1];
        const ruler = d3.path();
        const gRuler = svg.append('g').attr('class', 'ruler');

        ruler.moveTo(offsetX, 0);
        ruler.lineTo(width - offsetX, 0);

        gRuler.attr('transform', `translate(0, ${y})`)
            .transition(getTransition())
            .attr('opacity', 1);

        gRuler.append('path')
            .attr('class', 'ruler__path')
            .attr('stroke-dasharray', [5, 5])
            .attr('stroke-width', 1)
            .attr('stroke', 'grey')
            .attr('d', ruler.toString());

        gRuler.append('text')
            .attr('class', 'ruler__label')
            .attr('x', '50%')
            .attr('y', '5%')
            .text(`${varMonth.toFixed(1)}%`);
    };

    const updateRuler = (y, data) => {
        const {
            varMonth,
            monthShort,
            year
        } = data;

        d3.selectAll('g.ruler')
            .transition(getTransition())
            .attr('transform', `translate(0, ${y})`);
        d3.selectAll('.ruler__label')
            .transition(getTransition())
            .text(`${varMonth.toFixed(1)}%`);
        d3.selectAll('.ruler__tag')
            .transition(getTransition())
            .text(`${monthShort} ${year}`);
    };

    onMounted(() => {
        svg.append('g').attr('class', 'xAxis').attr('transform', `translate(0, ${height - offsetBottom})`).call(xAxis);
        svg.append('g').attr('class', 'yAxis').attr('transform', `translate(${offsetX}, 0)`).call(yAxis);
        svg.append('g')
            .attr('class', 'bars')
            .selectAll()
            .data([data[0]], d => d.date)
            .join('rect')
                .attr('x', d => bandScale(dateARG(d.date)))
                .attr('y', height - offsetBottom)
                .attr('height', 0)
                .attr('width', bandScale.bandwidth())
                    .transition(getTransition())
                    .on('end', () => addRuler(verticalScale(data[0].varMonth), svg))
                    .attr('y', d => verticalScale(d.varMonth))
                    .attr('height', d => verticalScale(0) - verticalScale(d.varMonth));

        node.value.append(svg.node());
    });

    return {
        onDataIndex: dataIndex => {
            const height = window.innerWidth <= 600 ? smallHeight : defaultHeight;
            const chunk = data.slice(0, Number(dataIndex) + 1);
            const maxVariation = d3.max(chunk, d => d.varMonth);
            const lastVariation = chunk[chunk.length - 1].varMonth;
            const verticalScaleUpdate = verticalScale.domain([0, maxVariation]).range([height - offsetBottom, offsetTop]).nice();
            const yAxis = d3.axisLeft(verticalScaleUpdate).ticks(4).tickFormat(t => t.toFixed(verticalAxisPrecision));
            const bandScaleUpdate = bandScale.domain(chunk.map(d => dateARG(d.date)));
            const xAxis = d3.axisBottom(bandScaleUpdate).tickFormat((d, i) => getTickLabel(i, dataIndex)).tickSizeOuter(0);

            d3.selectAll('g.xAxis').transition(getTransition()).call(xAxis);
            d3.selectAll('g.yAxis').transition(getTransition()).call(yAxis);
            d3.selectAll('g.bars').selectAll('rect')
                .data(chunk)
                .join(
                    enter => enter.append('rect')
                        .attr('x', d => bandScaleUpdate(dateARG(d.date)))
                        .attr('y', height - offsetBottom)
                        .attr('height', 0)
                        .attr('width', bandScaleUpdate.bandwidth())
                        .transition(getTransition())
                            .attr('y', d => verticalScaleUpdate(d.varMonth))
                            .attr('height', d => verticalScaleUpdate(0) - verticalScaleUpdate(d.varMonth)),
                    update => update
                        .transition(getTransition())
                            .attr('x', d => bandScaleUpdate(dateARG(d.date)))
                            .attr('height', d => verticalScaleUpdate(0) - verticalScaleUpdate(d.varMonth))
                            .attr('y', d => verticalScaleUpdate(d.varMonth))
                            .attr('width', bandScaleUpdate.bandwidth()),
                    exit => exit
                        .transition(getTransition())
                            .attr('x', width - offsetX - bandScaleUpdate.bandwidth() * paddingFactor)
                            .attr('y', height - offsetBottom)
                            .attr('height', 0)
                            .attr('width', 0)
                            .remove()
                );

                updateRuler(verticalScaleUpdate(lastVariation), chunk[chunk.length - 1]);
        },
        onResize: isSmall => {
            const height = isSmall ? smallHeight : defaultHeight;
            const verticalScaleResized = verticalScale.range([height - offsetBottom, offsetTop]).nice();
            const yAxis = d3.axisLeft(verticalScaleResized).ticks(4).tickFormat(t => t.toFixed(verticalAxisPrecision));
            const renderedData = d3.selectAll('g.bars').selectAll('rect').data();
            const lastVariation = renderedData[renderedData.length - 1].varMonth;

            d3.selectAll('g.xAxis').attr('transform', `translate(0,${height - offsetBottom})`);
            d3.selectAll('g.yAxis').attr('transform', `translate(${offsetX},0)`).call(yAxis);
            d3.selectAll('svg.chart-container')
                .attr('height', height)
                .attr('viewBox', [0, 0, width, height]);

            d3.selectAll('g.bars').selectAll('rect')
                .attr('y', d => verticalScaleResized(d.varMonth))
                .attr('height', d => verticalScaleResized(0) - verticalScaleResized(d.varMonth));

            updateRuler(verticalScaleResized(lastVariation), renderedData[renderedData.length - 1]);
        },
    }
};