import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { ref, onMounted } from 'vue';

const sortedData = (new Array(23)).fill({}).map((d, index) => ({
    x: index + 2000, 
    value: Math.floor(Math.random() * 150),
}));

export const useBarsDiagram = (node = null, initYear = 2000, config = {}) => {
    if (!node) {
        throw new Error('You need to pass a not null ref to useHistogram composable');
    }

    const {
        width = 1100,
        height = 600,
        offsetX = 50,
        offsetBottom = 50,
        offsetTop = 10,
    } = config;
    const barsDiagramSvg = ref(null);
    const dataChunk = d3.filter(sortedData, d => Number(d.x) <= Number(initYear));
    const yScale = d3.scaleLinear().domain([0, 150]).range([height - offsetBottom, offsetTop]);
    const xScale = d3.scaleBand().domain(dataChunk.map(d => d.x)).range([offsetX, width - offsetX]).padding(0.1);

    onMounted(() => {
        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        svg.append("g")
            .attr('class', 'bars')
            .attr('fill', 'coral')
            .selectAll()
            .data(dataChunk, d => d.x)
            .join("rect")
                .attr("x", d => xScale(d.x))
                .attr("y", d => yScale(d.value))
                .attr("height", d => yScale(0) - yScale(d.value))
                .attr("width", xScale.bandwidth());

        svg.append("g")
            .attr('class', 'xAxis')
            .attr("transform", `translate(0,${height - offsetBottom})`)
            .call(d3.axisBottom(xScale).tickSizeOuter(0));

        svg.append("g")
            .attr("transform", `translate(${offsetX},0)`)
            .call(d3.axisLeft(yScale).ticks(20).tickFormat(yScale => yScale.toFixed()))
            .call(g => g.select(".domain").remove())

        node.value.append(svg.node());

        barsDiagramSvg.value = svg;
    });

    return {
        update: year => {
            const dataChunk = d3.filter(sortedData, d => Number(d.x) <= Number(year));
            const newXScale = xScale.domain(dataChunk.map(d => d.x));

            d3.selectAll('g.xAxis').call(d3.axisBottom(newXScale).tickSizeOuter(0));

            d3.selectAll('g.bars').selectAll('rect')
                .data(dataChunk)
                .join(
                    enter => enter.append('rect')
                        .attr("x", d => newXScale(d.x))
                        .attr("y", d => yScale(d.value))
                        .attr("height", d => yScale(0) - yScale(d.value))
                        .attr("width", newXScale.bandwidth()),
                    update => update
                        .attr("x", d => newXScale(d.x))
                        .attr("y", d => yScale(d.value))
                        .attr("height", d => yScale(0) - yScale(d.value))
                        .attr("width", newXScale.bandwidth()),
                    exit => exit.remove(),
                );
        },
    }
};