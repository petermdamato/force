import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';
import Dropdown from './components/Dropdown';

import './App.css';
const dropdownA = []
const generateUniqueKey = () => 'child-' + Date.now()

const App = () => {
  const [childKey, setChildKey] = useState(generateUniqueKey());
  const [apiData, setApiData] = useState(null);
  const [options, setOptions] = useState(null);
  
  useEffect(() => {
        const url = "https://e3x1dd0mg5.execute-api.us-east-1.amazonaws.com/dev/projects";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json().then((data)=>
                  {

                  if (dropdownA.length < data.length) {
                    data.forEach(entry=>dropdownA.push({value:entry._id,label:entry.project}))
                  }

                  if (options !== null && options.length < 1) {
                    setOptions(dropdownA)
                  }

                  const url2 = "https://e3x1dd0mg5.execute-api.us-east-1.amazonaws.com/dev/project/" + data[0]._id;
                  const fetchDataInner = async () => {
                  try {
                      const response = await fetch(url2);
                      const json = await response.json().then((data)=>
                        {

                        data["scenes"].map((entry)=>{
                          entry["scene"] = entry.number
                          entry["intensity"] = entry["emotionally intense"]
                          if (entry.text.includes("FLASHBACK")) {
                            entry["flashback"] = true
                          } else {
                            entry["flashback"] = false
                          }
                          entry["content_short"] = entry.text
                        })
                        setApiData(data)
                      });      
                  } catch (error) {
                      console.log("error", error);
                  }
              };
              fetchDataInner();
              });      
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

  const reset = () => {
    setChildKey(generateUniqueKey())
  };

  const refetch = (titleId) =>{
    const url = "https://e3x1dd0mg5.execute-api.us-east-1.amazonaws.com/dev/project/" + titleId;
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json().then((data)=>
                  {

                  data["scenes"].map((entry)=>{
                    entry["scene"] = entry.number
                    entry["intensity"] = entry["emotionally intense"]
                    if (entry.text.includes("FLASHBACK")) {
                      entry["flashback"] = true
                    } else {
                      entry["flashback"] = false
                    }
                    entry["content_short"] = entry.text
                  })
                  setApiData(data)
                });

                
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
  }
        
  return (
    <div className="App">
      {apiData && <Chart apiData={apiData} key={childKey} reset={reset} refetch={refetch} populate={dropdownA} />}
    </div>
  );
}

export default App;