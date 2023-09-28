import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { onMounted } from 'vue';

const DATA = (new Array(20)).fill({}).map((d, index) => ({
    x: index + 2001, 
    value: Math.floor(Math.random() * 150),
}));

export const useBarsDiagram = (node = null, config = {}) => {
    if (!node) {
        throw new Error('You need to pass a not null ref to useHistogram composable');
    }

    onMounted(() => {
        const {
            width = 1100,
            height = 600,
            offsetX = 50,
            offsetBottom = 50,
            offsetTop = 10,
        } = config;
        const yScale = d3.scaleLinear().domain([0, 150]).range([height - offsetBottom, offsetTop]);
        const xScale = d3.scaleBand().domain(d3.sort(DATA, d => d.x).map(d => d.x)).range([offsetX, width - offsetX]).padding(0.1);

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll()
            .data(DATA)
            .join("rect")
                .attr("x", d => xScale(d.x))
                .attr("y", d => yScale(d.value))
                .attr("height", d => yScale(0) - yScale(d.value))
                .attr("width", xScale.bandwidth());

        svg.append("g")
            .attr("transform", `translate(0,${height - offsetBottom})`)
            .call(d3.axisBottom(xScale).tickSizeOuter(0));

        svg.append("g")
            .attr("transform", `translate(${offsetX},0)`)
            .call(d3.axisLeft(yScale).ticks(20).tickFormat(yScale => yScale.toFixed()))
            .call(g => g.select(".domain").remove())

        node.value.append(svg.node());
    });
};