export function runData(pl) {
  const graphd = {}
  const nodes = []
  const links = []
  const transition = []

  // let threshold = document.getElementById('slider').value / 100
  // tktktk
  let threshold = 50 / 100

  pl.forEach((entry)=>{
    if (!transition.includes(entry['Concept'])) {
      transition.push(entry['Concept'])
    }
  })
  transition.sort()

  pl.forEach((entry)=>{
    Object.keys(entry).forEach((innerEntry)=>{
      if (innerEntry != 'Concept' && +entry[innerEntry] > threshold) {
        const drop = {}
        drop['source'] = indexLookup(entry['Concept'],transition)
        drop['target'] = indexLookup(innerEntry,transition)
        drop['value'] = entry[innerEntry]

        if (links.filter(e=>e.target === drop['source']).filter(f=>f.source === drop['target']).length<1) {
          links.push(drop)
        }
        
      }
    })
  })

  transition.forEach((entry,i)=>{
      nodes.push({id:"node-"+i,label:entry,group:1})
  })

  
  graphd["nodes"] = nodes
  graphd["links"] = links

  return graphd
}

function indexLookup(value,array) {
  for (let i = 0; i < array.length; i++ ) {
    if (value === array[i]) {
      return "node-" + i
      break;
    }
  }
}

  // do a version of this for the distance
 export function ticked(link, node) {
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
