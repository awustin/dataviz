import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
import { onMounted } from 'vue';
import { dateARG } from '../utils';

export const useBarsDiagram = (options = {}) => {
    const {
        data = [],
        node = null,
        width = 1100,
        height = 600,
        offsetX = 50,
        offsetBottom = 50,
        offsetTop = 10,
    } = options;

    if (!node) {
        throw new Error('You need to pass a not null ref to useBarsDiagram composable');
    }

    if (!Array.isArray(data)) {
        throw new Error('useBarsDiagram composable needs to be passed an array as data argument');
    }

    // First datum
    const initDate = new Date(data[0].date);
    const initVariation = data[0].variationAcc;
    const verticalScale = d3.scaleLinear([0, initVariation], [height - offsetBottom, offsetTop]).nice();
    const yAxis = d3.axisLeft(verticalScale).ticks().tickFormat(verticalScale => verticalScale.toFixed());
    const bandScale = d3.scaleBand([dateARG(initDate)], [offsetX, width - offsetX]).paddingOuter(0.1);
    const xAxis = d3.axisBottom(bandScale).tickFormat((d,i) => getTickLabel(i, 0)).tickSizeOuter(0)
    const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;');

    const getTransition = () => svg.transition().duration(500).ease(d3.easeCubicOut);

    const getTickLabel = (tickIndex, dataIndex) => {
        const { monthElapsedShort, year } = data[tickIndex];

        if (!Number(dataIndex)) {
            return `${monthElapsedShort} ${Number(year)}`
        }

        if (monthElapsedShort.toUpperCase() === 'DIC')
            return Number(year) - 1;

        if (Number(dataIndex) > 12) {
            if (Number(tickIndex) === Number(dataIndex))
                return `${monthElapsedShort} ${Number(year)}`;

            return ''
        };

        return monthElapsedShort;
    };

    onMounted(() => {
        svg.append('g').attr('class', 'xAxis').attr('transform', `translate(0,${height - offsetBottom})`).call(xAxis);

        svg.append('g').attr('class', 'yAxis').attr('transform', `translate(${offsetX},0)`).call(yAxis);

        svg.append('g')
            .attr('class', 'bars')
            .attr('fill', 'coral')
            .selectAll()
            .data([data[0]], d => d.date)
            .join('rect')
                .attr('x', d => bandScale(dateARG(d.date)))
                .attr('y', height - offsetBottom)
                .attr('height', 0)
                .attr('width', bandScale.bandwidth())
                    .transition(getTransition().duration(3000))
                    .attr('y', d => verticalScale(d.variationAcc))
                    .attr('height', d => verticalScale(0) - verticalScale(d.variationAcc));

        node.value.append(svg.node());
    });

    return {
        update: dataIndex => {
            const chunk = data.slice(0, Number(dataIndex) + 1);
            const maxVariation = d3.max(chunk, d => d.variationAcc);
            const verticalScaleUpdate = verticalScale.domain([0, maxVariation]);
            const yAxis = d3.axisLeft(verticalScaleUpdate).ticks().tickFormat(verticalScaleUpdate => verticalScaleUpdate.toFixed());
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
                            .attr('y', d => verticalScaleUpdate(d.variationAcc))
                            .attr('height', d => verticalScaleUpdate(0) - verticalScaleUpdate(d.variationAcc)),
                    update => update
                        .transition(getTransition())
                            .attr('x', d => bandScaleUpdate(dateARG(d.date)))
                            .attr('height', d => verticalScaleUpdate(0) - verticalScaleUpdate(d.variationAcc))
                            .attr('y', d => verticalScaleUpdate(d.variationAcc))
                            .attr('width', bandScaleUpdate.bandwidth()),
                    exit => exit
                        .transition(getTransition())
                        .attr('x', width - offsetX)
                        .attr('y', height - offsetBottom)
                        .attr('height', 0)
                        .attr('width', 0)
                        .remove()
                );
        },
    }
};