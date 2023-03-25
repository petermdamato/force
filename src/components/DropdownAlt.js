// DropdownAlt.js

function DropdownAlt({changeOption,id,data,options, classProp, changeTrigger}){
    const handleChangeOption = (evt) => {
        if (changeOption) {
            changeOption(evt.target.value);
        } 
        if (changeTrigger) {
            changeTrigger(evt.target.value);
        }
    };
    
    return (
        <div className={"dropdown "+ classProp}>
            <select key={id} className="dropdown-inner" name="dropdown" value={options.keyword} id={id} onChange={handleChangeOption}>
                <option value="All" key={`node-all-dropdown`}>All</option>
                {data.map(function(datObj){
                    return <option value={datObj.label} key={`${datObj.id}-dropdown`}>{datObj.label}</option>
                })}
              </select>
        </div>
        
    )
}

export default DropdownAlt;