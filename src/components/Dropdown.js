// Dropdown.js

function Dropdown({changeOption,id,data,selection, classProp, changeTrigger}){
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
            <select key={id} className="dropdown-inner" name="dropdown" value={selection} id={id} onChange={handleChangeOption}>
                {data.map(function(datObj){
                    return <option value={datObj.value} key={id + datObj.value}>{datObj.label}</option>
                })}
              </select>
        </div>
        
    )
}

export default Dropdown;