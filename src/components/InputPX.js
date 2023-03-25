// InputPX.js

function InputPX({changeWidth,width,hidden}){
    const handleChangeWidth = (evt) => {
        changeWidth(+evt.target.value);
    };

    return (
        <div className={`input ${hidden}`}>
            <input onChange={handleChangeWidth} placeholder={`${width}px`}/>
        </div>
        
    )
}

export default InputPX;