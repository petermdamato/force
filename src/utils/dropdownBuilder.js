const titleCase = (string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function addNums(startingArr, data) {
    let dataToCheck = Object.keys(data[0])
    dataToCheck.shift()
    dataToCheck.shift()
    let i = 0
    dataToCheck.forEach((entry)=>{
        while (i < data.length) {
            if (typeof(data[i][entry]) === "number") {
                if (startingArr.some(function(o){return o["value"] === entry;})) {
                    break
                } else {
                    startingArr.push({value:entry.toLowerCase(),label:titleCase(entry)})
                    break
                }
            } else if (data[i][entry] === null) {
                i++
            } else {
                break
            }
        }
    })

    return startingArr

}

export function addBools(startingArr, data) {
    
    let dataToCheck = Object.keys(data[0])
    dataToCheck.shift()
    dataToCheck.shift()
    let i = 0
    dataToCheck.forEach((entry)=>{
        while (i < data.length) {
            if (typeof(data[i][entry]) === "boolean") {
                if (startingArr.some(function(o){return o["value"] === entry;})) {
                    break
                } else {
                    startingArr.push({value:entry.toLowerCase(),label:titleCase(entry)})
                    break
                }
            } else if (data[i][entry] === null) {
                i++
            } else {
                break
            }
        }
    })

    return startingArr

}