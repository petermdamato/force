import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const colorArr = ["#1A1919","#767777","#8DA2B0","#CAD5DA","#E6E7E8","#FCB92B","#FFD65C","#FFE075","#FFEB95","#ECE18C","#BE8D63","#AB218E","#C786BA","#DD9FAC","#ECC5CC","#EF4123","#ED7422","#F47A55","#FBC3A5","#FFE6CB","#61C1ED","#5CA446","#BEBE32","#77AAB6","#1A96A9","#E2B678","#E8E2E0","#E5D2B4","#CBD1C4"]

function ColorPicker({defaultColor, title, changeColor, classPass, hiLo}){
	const handleChangeColor = (evt) => {
        changeColor(hiLo, evt.target.value);
    };

	return (
		<div className="color-picker">
		    <div>
		    <p className={classPass}>{title}</p>
		    <div className="color-input-container">
		    	<input className="color color-input" type="color" defaultValue={defaultColor} id="lo" list="lo-color" onChange={handleChangeColor}/>  
		    	<datalist id="lo-color">
			    	{colorArr.map((entry)=>{
			    		return <option key={entry.replace("#","")} value={entry} />
			    	})}
				</datalist>
  				<div className="color color-icon">
					<FontAwesomeIcon id="swatch" icon={solid('swatchbook')} size="lg" />
				</div>
  				</div>
		      </div>
		  </div>
	)
}

export default ColorPicker