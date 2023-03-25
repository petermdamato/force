import React, { useState,useEffect } from 'react';
import Card from './Card';
import Legend from './Legend';
import Network from './Network';
import Sidebar from './Sidebar';
import ForceGraph from './ForceGraph';
import { runData } from './../utils/runData';
import payload from './../assets/data'
import _ from 'lodash';

let graph = runData(payload)

function Chart({reset,apiData,optionId,refetch,populate}) {
    const [width, setWidth] = useState(1000);
    const [nodes, setNodes] = useState(_.cloneDeep(graph.nodes))
    const [links, setLinks] = useState(_.cloneDeep(graph.links))
    const [unlinks, setUnlinks] = useState([])
    const [hidden, setHidden] = useState({})
    const [options, setOptions] = useState({orphans:true,edit:true,varyDistance:false,keyword:"All",tiers:1})

    const [colors, setColors] = useState({high:"#AB218E",low:"#D9D9D9"})

    const [threshold, setThreshold] = useState(0.5)



    useEffect(()=>{
      refreshLinks()
      console.log(threshold)
    },[threshold,options.keyword])

    useEffect(()=>{
          // const tempArr = []

          // links.forEach((entry) => {
          //   if (+entry.value >= threshold) {
          //       tempArr.push(entry.source.id)
          //       tempArr.push(entry.target.id)
          //   }
          // });

          // setHidden(tempArr)
    },[options.orphans, threshold])

    const changeThreshold = (inp) => {
      setThreshold(+inp/100);
    };
    const changeHighCircleColor = (nc) => {
      const items  = _.cloneDeep(colors);
      items.high = nc;
      setColors(items);
    }

    const changeLinks = (arr) => {
      setLinks(arr)
    }
    const changeUnlinks = (arr) => {
      setLinks(arr)
    }
    const changeNodes = (arr) => {
      setNodes(arr)
    }
    const refreshLinks = () => {
      const linksTemp = []
      const hiddenTemp = []
      const hiddenSource = []
      const hiddenTarget = []
      const toSort = links.concat(unlinks)



      if (options.keyword === "All") {
        for (const sortable of toSort) {
          if (sortable.value >= threshold) {
            linksTemp.push(sortable)
            if (!hiddenSource.includes(sortable.source.id)) {
              hiddenSource.push(sortable.source.id)
            } 
            if ((!hiddenTarget.includes(sortable.target.id))) {
              hiddenTarget.push(sortable.target.id)
            }
          } else {
            hiddenTemp.push(sortable)
          } 
        }
      } else {
        for (const sortable of toSort) {
          if (sortable.value >= threshold && (sortable.target.label === options.keyword || sortable.source.label === options.keyword)) {
            linksTemp.push(sortable)
            if (!hiddenSource.includes(sortable.source.id)) {
              hiddenSource.push(sortable.source.id)
            } 
            if ((!hiddenTarget.includes(sortable.target.id))) {
              hiddenTarget.push(sortable.target.id)
            }
          } else {
            hiddenTemp.push(sortable)
          } 
        }
      }
      

      setLinks(linksTemp)
      setUnlinks(hiddenTemp)
      setHidden({source:hiddenSource, target:hiddenTarget})
    }
      

    const toggleEdit = () => {
      const items  = _.cloneDeep(options);
      items.edit = !options.edit;
      setOptions(items);
    }

    const toggleOrphans = () => {
      const items  = _.cloneDeep(options);
      items.orphans = !options.orphans;
      setOptions(items);
    }

    const toggleDistance = () => {
      const items  = _.cloneDeep(options);
      items.varyDistance = !options.varyDistance;
      setOptions(items);
    }

    const changeKeyword = (input) => {
      const items  = _.cloneDeep(options);
      items.keyword = input;
      setOptions(items);
    }

    const changeTiers = (input) => {
      const items  = _.cloneDeep(options);
      items.tiers = input;
      setOptions(items);
    }

    const changeCircleColor = (option, input) => {
      const items  = _.cloneDeep(colors);
      items[option] = input;
      setColors(items);
    }

    return (
        <div className="App-Container">
            <div className="viz-container">
            <Sidebar 
                     apiData={apiData["scenes"]}
                     threshold={threshold}
                     changeThreshold={changeThreshold}
                     changeHighCircleColor={changeHighCircleColor}
                     width={width}
                     reset={reset} 
                     toggleEdit={toggleEdit}
                     toggleOrphans={toggleOrphans}
                     toggleDistance={toggleDistance}
                     colors={colors}
                     changeCircleColor={changeCircleColor}
                     changeKeyword={changeKeyword}
                     changeTiers={changeTiers}
                     options={options}
                     nodes={nodes}
             />
            <div className="viz-canvas">
              <div className="viz-canvas-header">
                <Card titleData={apiData}
                      refetch={refetch}
                      populate={populate}
                      />
                <Legend width={300} 
                        height={140} 
                        margins={[65,50,5,10]} 
                        key={Math.random()} 

                  />
              </div>
              <ForceGraph  className="App-Inner" 
                        key="force-graph"
                        options={options}
                        changeNodes={changeNodes} 
                        changeLinks={changeLinks} 
                        changeUnlinks={changeUnlinks} 
                        nodes={nodes} 
                        links={links}
                        margins={[65,50,5,10]} 
                        key={Math.random()} 
                        threshold={threshold}
                        colors={colors}
                        changeThreshold={changeThreshold}
                        refreshLinks={refreshLinks}
                        hidden={hidden}
                  />
                </div>
                </div>            
        </div>
    );
}

export default Chart;