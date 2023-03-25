// Scatter.js
import * as d3 from 'd3';
import { select } from 'd3-selection'
import $ from 'jquery';
import React, { useRef, useEffect, useState } from 'react';
import { average, median, wrap } from './../utils/util';
import { runData } from './../utils/runData';
import payload from './../assets/data'

import _ from 'lodash';

function Network({width, margins, height, layout, dashes, dots, thresholds, movingAverage, apiData, threshold}){
    // clone deep in order to not carry over an array that will get altered
    const usableData = _.cloneDeep(apiData);

    const [options, setOptions] = useState([{id:"All",label:"All"}]);
    const [levels, setLevels] = useState(1)
    const [selected, setSelected] = useState("All");
    const [paused, setPaused] = useState(false)
    const [editing, setEditing] = useState(true)
    const [distance, setDistance] = useState(false)
    const [orphans, setOrphans] = useState(false)
    const [instructionsViz, setInstructionsViz] = useState(false)

    let graph = runData(payload)
    // const [nodes, setNodes] = useState(_.cloneDeep(graph.nodes))
    // const [links, setLinks] = useState(_.cloneDeep(graph.links))

    const [colors, setColors] = useState({high:"#AB218E",low:"#D9D9D9"})

    const instructions = $("#instructions");

    const ref = useRef();
    const myRef = useRef();
    
    // Put anything in here (wrapped in function) in order to change on component updates
    useEffect(() => {
        if (d3.select("#main")._groups[0][0] === null) {
            draw();
        }
    }, []);

    useEffect(() => {
            draw();
    }, [threshold]);

    const color = d3.scaleLinear()
            .domain([0.3, 1]);

    const linkDistance = d3.scaleLinear()
            .domain([0.3, 1].reverse()).range([40,250]);

    const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().distance(100).id(function(d) { return d.id; }))
            .force("charge", d3.forceManyBody(10))
            .force("collide", d3.forceCollide(20))
            .force("center", d3.forceCenter(width / 2, height / 2));
    
    const draw = () => {

          const svg = d3.select(ref.current)
            .attr("width", width + margins[1] + margins[3])
            .attr("height", height + margins[2] + margins[0])
            .style("border-radius", "5px")

          const g = svg.append("g").attr("id", "main")
          
          let linksData = []

          graph.links.forEach(entry=>linksData.push(entry))

          if (selected === "All") {
              linksData = linksData.filter(function(e){
                  return +e.value >= threshold;
              });
          } else if (levels === 1) {
             linksData = linksData.filter(function(e){
              return e.target.id === selected || e.source.id === selected;
              });

             linksData = linksData.filter(function(e){
              return +e.value >= threshold;
            });
          } else {
            linksData = []

            const transitionArray = []
            graph.links.forEach((entry)=>{
                  if (selected === "lgbtq") {
                    setSelected("lgbtq+")
                  }
              linksData.push(entry)
                  if (entry.source.id === selected || entry.target.id === selected) {
                    if (transitionArray.includes(entry.source.id) && transitionArray.includes(entry.target.id) ) {
                    } else if (transitionArray.includes(entry.source.id)) {
                      transitionArray.push(entry.target.id)
                    } else if (transitionArray.includes(entry.target.id)) {
                      transitionArray.push(entry.source.id)
                    } else {
                      transitionArray.push(entry.source.id)
                      transitionArray.push(entry.target.id)
                    }
                  }
                })

              linksData = linksData.filter(function(e){
                  return transitionArray.includes(e.target.id) || transitionArray.includes(e.source.id)
              });
               linksData = linksData.filter(function(e){
                return +e.value >= threshold;
              });
          }

          let nodesData = []

          graph.nodes.forEach(entry=>nodesData.push(entry))

          // Start the dropdown list with the first options entry
          let dropdownData = [options[0]]
          
          nodesData.forEach((topic)=>{
            dropdownData.push({id:topic["id"], label:topic["label"]});
          });

          setOptions(dropdownData)

          // Set the color scale (grey or whatever color to color denoting density)
          color.domain([d3.min(linksData, function(d){
            return +d.value
          }),d3.max(linksData, function(d){
            return +d.value
          })]).range([colors.low,colors.high])

          // Generate lines with color palette
          var link = g.append("g")
              .attr("class", "links")
            .selectAll("line")
            .data(linksData)
            .enter().append("line")
              .attr("stroke-width", 4)
              .attr("stroke", function(d) { return color(d.value); });

          // Attach nodes g element to lines
          var node = g.append("g")
              .attr("class", "nodes")
            .selectAll("g")
            .data(nodesData)
            .enter().append("g")
              .attr("id", (d) => {
                return d.id
              })

          const circles = node.append("circle")
            .attr("r", 5)
            .style("stroke", colors.high)
            .attr("fill", "white");

          simulation
              .nodes(nodesData)
              .on("tick", ticked);

          simulation.force("link")
              .links(linksData);




          const labels = node.append("text")
              .text(function(d) {
                return d.label;
              })
              .classed("label", true)
              .style("font-family", "Brandon")
              .style("font-weight", 300)
              .style("text-transform", "uppercase")
              .attr('x', 10)
              .attr('y', 3);

          node.append("title")
              .text(function(d) { return d.label; });
        
            node.on("click", function(d){
                      if (editing) {
                        nodesData = nodesData.filter(function(n){ return n.id !==  d.target.__data__.id; });
                        linksData = linksData.filter(function(e){
                          return e.source.id !==  d.target.__data__.id && e.target.id !== d.target.__data__.id;
                        });

                        restart();
                      }
                  });

             function restart() {

                    color.range([colors.low, colors.high])
                    // Apply the general update pattern to the nodes.
                    node = node.data(nodesData, function(d) { 
                      return d.id;});
                    node.exit().remove();
                    node = node.enter().append("g").merge(node);

                    node.attr("id", (d) => {
                        return d.id
                      })    

                    node.append("circle")
                      .attr("r", 5)
                      .style("stroke", colors.high)
                      .attr("fill", "white");

                    node.append("text")
                      .text(function(d) {
                        return d.label;
                      })
                      .classed("label", true)
                      .style("font-family", "Brandon")
                      .style("font-weight", 300)
                      .style("text-transform", "uppercase")
                      .attr('x', 10)
                      .attr('y', 3);

                    // grab the node belonging to the central topic and expand the radius of the circle and bold the text
                    d3.selectAll("g")
                      .selectAll("circle")
                      .attr("r", 5)

                    d3.selectAll("g")
                      .selectAll("text")
                      .attr('x', 10)
                      .style("font-weight", 300)

                    const grabber = "#" + selected;

                    d3.select(grabber)
                      .selectAll("circle")
                      .attr("r", 10)

                    d3.select(grabber)
                      .selectAll("text")
                      .attr('x', 14)
                      .style("font-weight", 500)

                    linkDistance.domain([d3.max(linksData, function(d){
                      return +d.value
                    }),d3.min(linksData, function(d){
                      return +d.value
                    })])

                    // Apply the general update pattern to the links.
                    color.domain([d3.min(linksData, function(d){
                      return +d.value
                    }),d3.max(linksData, function(d){
                      return +d.value
                    })])

                    link = link.data(linksData, function(d) { return d.source.id + "-" + d.target.id; });
                    link.exit().remove();
                    link = link.enter().append("line").attr("stroke-width", 4).merge(link);

                    d3.selectAll('line')
                        .each(function(d) {
                          d3.select(this).style('stroke', color(d.value))
                        })
                    node.append("title")
                        .text(function(d) { return d.label; });

                    drag_handler(node);

                  node.on("click", function(d){
                      if (editing) {
                        nodesData = nodesData.filter(function(n){ return n.id !==  d.target.__data__.id; });
                        linksData = linksData.filter(function(e){
                          return e.source.id !==  d.target.__data__.id && e.target.id !== d.target.__data__.id;
                        });

                        restart();
                      }
                  });



                    // Update and restart the simulation.
                    if (distance !== true) {
                      simulation.force("link", d3.forceLink().distance(100).id(function(d) { return d.id; }))
                      simulation
                      .nodes(nodesData)
                      .on("tick", ticked);
                      simulation.force("link").links(linksData);
                      simulation.alpha(1).restart();
                    } else {
                      simulation.force("link", d3.forceLink().distance((d)=>{
                        return linkDistance(+d.value)
                      }).id(function(d) { return d.id; }))
                      simulation
                        .nodes(nodesData)
                        .on("tick", ticked);
                      simulation.force("link").links(linksData);
                      simulation.alpha(1).restart();
                    }
                    

                  } 
          // Create a drag handler and append it to the node object instead
          const drag_handler = d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended);

          drag_handler(node);
  
         const zoom_handler = d3.zoom()
            .on("zoom", zoom_actions);

        zoom_handler(svg); 

         function ticked() {
                link
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                node
                    .attr("transform", function(d) {
                      return "translate(" + d.x + "," + d.y + ")";
                    })
              }
             function zoom_actions(e){
            g.attr("transform", e.transform)
        }
    }

    //Zoom functions 
    const dragstarted = (e,d) => {
      if (!e.active) {
        if (paused) {
          simulation.alphaTarget(0.005).restart();
        } else {
          simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }
    }
    const dragged = (e,d) => {
      d.fx = e.x;
      d.fy = e.y;
    }
    const dragended = (e,d) => {
      if (!e.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    return (
        <div className="chart">
            <svg id="chart" width={width} height={height} ref={ref}>
            </svg>
        </div>
        
    )
}

export default Network;