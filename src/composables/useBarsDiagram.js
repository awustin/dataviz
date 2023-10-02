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
    const initVariation = data[0].variation_acc;
    const verticalScale = d3.scaleLinear([0, initVariation], [height - offsetBottom, offsetTop]).nice();
    const timeScale = d3.scaleUtc([initDate, initDate], [offsetX, width - offsetX]);
    const bandScale = d3.scaleBand([dateARG(initDate)], [offsetX, width - offsetX]).padding(0.05);
    const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('style', 'max-width: 100%; height: auto;');
    const getTransition = () => svg.transition().duration(2500).ease(d3.easeCubicOut);

    onMounted(() => {
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
                    .transition(getTransition())
                    .attr('y', d => verticalScale(d.variation_acc))
                    .attr('height', d => verticalScale(0) - verticalScale(d.variation_acc));

        svg.append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0,${height - offsetBottom})`)
            .call(d3.axisBottom(timeScale).tickSizeOuter(0));

        svg.append('g')
            .attr('class', 'yAxis')
            .attr('transform', `translate(${offsetX},0)`)
            .call(d3.axisLeft(verticalScale).ticks().tickFormat(verticalScale => verticalScale.toFixed()))
            .call(g => g.select('.domain').remove());

        node.value.append(svg.node());
    });

    return {
        update: dateCurrent => {
            // Yearly step
            const date = new Date(`01/01/${Number(dateCurrent) + 1}`);
            const chunk = d3.filter(data, d => new Date(d.date).getTime() < date.getTime());
            // Adjust scales            
            const verticalScaleUpdate = d3.scaleLinear([0, d3.max(chunk, d => d.variation_acc)], [height - offsetBottom, offsetTop]).nice();
            const timeScaleUpdate = d3.scaleUtc([new Date(chunk[0].date), date], [offsetX, width - offsetX]);
            const bandScaleUpdate = d3.scaleBand(d3.utcMonth.range(...timeScaleUpdate.domain()).map(d => dateARG(d)), [offsetX, width - offsetX]);

            // Adjust axes
            d3.selectAll('g.xAxis')
                .transition(getTransition())
                .call(d3.axisBottom(timeScaleUpdate).tickSizeOuter(0));

            d3.selectAll('g.yAxis')
                .transition(getTransition())
                .call(d3.axisLeft(verticalScaleUpdate).ticks().tickFormat(verticalScaleUpdate => verticalScaleUpdate.toFixed()))

            d3.selectAll('g.bars').selectAll('rect')
                .data(chunk)
                .join(
                    enter => enter.append('rect')
                        .attr('x', d => bandScaleUpdate(dateARG(d.date)))
                        .attr('y', height - offsetBottom)
                        .attr('height', 0)
                        .attr('width', bandScaleUpdate.bandwidth())
                        .transition(getTransition())
                            .attr('y', d => verticalScaleUpdate(d.variation_acc))
                            .attr('height', d => verticalScaleUpdate(0) - verticalScaleUpdate(d.variation_acc)),
                    update => update
                        .transition(getTransition())
                            .attr('x', d => bandScaleUpdate(dateARG(d.date)))
                            .attr('height', d => verticalScaleUpdate(0) - verticalScaleUpdate(d.variation_acc))
                            .attr('y', d => verticalScaleUpdate(d.variation_acc))
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