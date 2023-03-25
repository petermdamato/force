// Drag and math utils
import {select} from 'd3';

export const dragstarted = (d) => {
        console.log("drag started")
    }

export const dragged = (d) => {
    console.log("dragging")
    }

export const dragended = (d, p) => {
    console.log(d, p)
    }

export const average = array => array.reduce((a, b) => a + b) / array.length;
export const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export const wrap = (text, width) => {
    text.each(function () {
        var text = select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}
export const checkNames = (startingArr, data) => {
    let combinationsArr = {}

    // Converts user input to regex string that searches for name and only the name -
    // Formatting issues can cause 
    startingArr.forEach((entry)=>{
        startingArr.forEach((entry2) =>{
            const entryRE = eval("/[\-\!\\\s'\.,n](" + entry + "|" + entry.charAt(0).toUpperCase() + entry.slice(1) + "|" + entry.toUpperCase() + ")[\-\!\\\s'\.,]/i")
            const entry2RE = eval("/[\-\!\\\s'\.,n](" + entry2 + "|" + entry2.charAt(0).toUpperCase() + entry2.slice(1) + "|" + entry2.toUpperCase() + ")[\-\!\\\s'\.,]/i")

            if (entry !== entry2) {
                data.forEach((scene,i)=>{
                    if (entry2RE.test(scene.text) && entryRE.test(scene.text)) {
                        if (Object.keys(combinationsArr).includes(entry2 + "|" + entry) && !combinationsArr[entry2 + "|" + entry].includes(i)) {
                            combinationsArr[entry2 + "|" + entry].push(i)

                        } else if (Object.keys(combinationsArr).includes(entry + "|" + entry2) && !combinationsArr[entry + "|" + entry2].includes(i))  {
                            combinationsArr[entry + "|" + entry2].push(i)
                        } else {
                            if (entry2.localeCompare(entry) === -1) {
                                combinationsArr[entry2 + "|" + entry] = []
                                combinationsArr[entry2 + "|" + entry].push(i)

                            } else {
                                combinationsArr[entry + "|" + entry2] = []
                                combinationsArr[entry + "|" + entry2].push(i)
                            }
                        }
                    }
                })
            }
        })
    })

    return combinationsArr
}