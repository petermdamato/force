// Legend.js
import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function Legend({ width, height, margins,}){
    const arr = ['dot-dot']
    const ref = useRef();

    // Put anything in here (wrapped in function) in order to change on component updates
    useEffect(() => {
        if (d3.select("#legend-content")._groups[0][0] === null) {
            draw();
        }
    }, []);

    let yScale = d3.scaleBand()
        .domain(arr.map(d=>d))
        .range([0,height]);

    const draw = () => {
        const svg = d3.select(ref.current)
            .attr("width", width + margins[1] + margins[3])
            .attr("height", height + margins[2] + margins[0])
            .style("border-radius", "5px")
                .append("g")
                .attr("id", "legend-content")

        if (margins.length > 0) {
            svg.attr("transform", "translate(" + margins[3] + "," + margins[0] + ")")
        }   
        svg.append("text")
            .attr("x", width/2 - margins[3]/2)
            .attr("y", -margins[0]/2)
            .attr("font-weight", 500)
            .text("LEGEND")

        
        }
        
    return (
        <div className="chart chart-legend">
            <svg id="legend" ref={ref}>
            </svg>
        </div>
        
    )

}

export default Legend;