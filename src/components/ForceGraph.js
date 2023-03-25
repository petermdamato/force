import * as d3 from "d3";
import { useEffect, useMemo, useState, useRef } from "react";
import Draggable from 'react-draggable'

const color = d3.scaleLinear()
            .domain([0.3, 1])

const simulation = d3
      .forceSimulation()

const width = 1200
const height = 800

const linkDistance = d3.scaleLinear()
    .domain([0.3, 1].reverse()).range([40,250]);

function ForceGraph({ nodes, links, changeLinks,unlinks, changeUnlinks, changeNodes, options, hidden, setHidden,refreshLinks, colors }) {
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [animatedLinks, setAnimatedLinks] = useState([]);
  
  const [dragNode, setDragNode] = useState(null)
  const [dragLinks, setDragLinks] = useState([])

  color.range([colors.low, colors.high])
  
  const ref = useRef();
  const refG = useRef();
  
   linkDistance.domain([d3.max(links, function(d){
      return +d.value
    }),d3.min(links, function(d){
      return +d.value
    })])

  // re-create animation every time nodes change
  useEffect(() => {    
    if (options.varyDistance) {
      simulation.force("link", d3.forceLink().distance((d)=>{
        return linkDistance(+d.value)
      }).id(function(d) { 
        return d.id; }))
      .force("charge", d3.forceManyBody(10)) 
      .force("collide", d3.forceCollide(20))
    } else {
      simulation.force("link", d3.forceLink().distance(100).id(function(d) { 
          return d.id; }))
        .force("charge", d3.forceManyBody(10)) 
        .force("collide", d3.forceCollide(20))
        .force("center", d3.forceCenter(width/2,height/2))
    }

    // slow down with a small alpha
    simulation.alpha(0.3).restart();
    // update state on every frame

    simulation.on("tick", () => {
      setAnimatedNodes([...simulation.nodes()]);
      setAnimatedLinks([...simulation.force('link').links()])
    });

    // copy nodes into simulation
    simulation.nodes([...nodes]);

    simulation.force("link")
              .links([...links]);
        
    // stop simulation on unmount
    // return () => simulation.stop();
  }, [nodes, links]);

  useEffect(()=>{
      const svg = d3.select(ref.current)
    const zoom_handler = d3.zoom()
            .on("zoom", zoom_actions);

    zoom_handler(svg); 

      function zoom_actions(e){
        const g = d3.select(refG.current)
        g.attr("transform", e.transform)
        }
    },[options.edit])

  useEffect(()=>{
    color.domain([d3.min(links, function(d){
            return +d.value
          }),d3.max(links, function(d){
            return +d.value
          })]).range([colors.low,colors.high])
  },[links])

  const handleNodeClick = (e) => {
    if (options.edit) {
      const targetNodeId = e.target.id;

      
      const linksTemp = links.filter(function(e){
          return e.source.id !== targetNodeId && e.target.id !== targetNodeId;
        });
      changeLinks(linksTemp)

      const unlinksTemp = unlinks.filter(function(e){
          return e.source.id !== targetNodeId && e.target.id !== targetNodeId;
        });
      changeUnlinks(unlinksTemp)
      refreshLinks()
    }
  }
  const handleNodeDrag = (e) => {
    simulation.alpha(0.3).restart();
    setDragNode(e.target.id)
    const targetedLinks = []
    const sourcedLinks = []
    links.forEach((link)=>{
      if (link.source.id == e.target.id) {
        targetedLinks.push(link)
      } else if (link.target.id == e.target.id) {
        sourcedLinks.push(link)
      }
    })
    setDragLinks([sourcedLinks,targetedLinks])
  }
  const handleNodeDragging = (e) => {
    const tempNodes = nodes
    tempNodes[dragNode.split("-")[1]]["x"] = e.clientX
    tempNodes[dragNode.split("-")[1]]["y"] = e.clientY - 70
    changeNodes(tempNodes)
  }

  const endDrag = (e) =>{
    const tempNodes = nodes
    tempNodes[dragNode.split("-")[1]]["vx"] = null
    tempNodes[dragNode.split("-")[1]]["vy"] = null
    changeNodes(tempNodes)
    simulation.alpha(0).restart();
  }

  return (
    <svg ref={ref} width={width} height={height} key="svg-el">
        
    <g ref={refG} key="g-el">
        {animatedLinks.map((link) => {
        return (
        <line
          id={link.source.id + "--" + link.target.id}
          className="link"
          x1={link.source.x}
          x2={link.target.x}
          y1={link.source.y}
          y2={link.target.y}
          key={`link-${link.index}`}
          stroke={color(link.value)}
          strokeWidth={4}
          fill="transparent"
        />
      )})}
      {animatedNodes.map((node) => (
        
      <Draggable key={`draggable-${node.id}`} onMouseDown={handleNodeDrag} onDrag={handleNodeDragging} onMouseUp={endDrag} positionOffset={{ x: '-50%', y: '-50%' }}>
        <g className={`node${(options.orphans&&!hidden.source.includes(node.id)&&!hidden.target.includes(node.id))?' hidden':''}`} key={`node-${node.id}`}>
          
          <circle
            draggable="true"
            className="node-dot"
            id={node.id}
            cx={node.x}
            cy={node.y}
            r={5}
            key={`circle--${node.id}`}
            stroke={colors.high}
            strokeWidth={2.5}
            fill="white"
            onClick={handleNodeClick}

          />
          
          <text
            className="node-label"
            id={`text-${node.id}`}
            dx={node.x + 10}
            dy={node.y + 3}
            key={`text-${node.id}`}
            stroke="black"
            fill="black"
        >{node.label}</text></g>
      </Draggable>
      ))}

    </g>

      </svg>
  );
}

export default ForceGraph