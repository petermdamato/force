// Checkbox.js

function Checkbox({changeOption,label,ischecked}){
    const handleClick = (evt) => {
        changeOption(evt.target.value === "checked");
    };


    return (
        <div className="checkbox-container">
            <input className="default-checkbox" type="checkbox" value="" onClick={handleClick} checked={ischecked} readOnly/>
            <label className="checkbox-text">{label.replace("-", " ")}</label>
        </div>
        
    )
}

export default Checkbox;


