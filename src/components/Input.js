// Input.js

function Input({changeScore, flag,placeholder}){
    const handleChangeScore = (evt) => {
        changeScore(+evt.target.value,flag);
    };

    const validate = (evt) => {
      let key;
      const theEvent = evt || window.event;

      // Handle paste
      if (theEvent.type === 'paste') {
          key = evt.clipboardData.getData('text/plain');
      } else {
      // Handle key press
          key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
      }
      const regex = /[0-9]|\./;
      if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
      }
    }

    return (
        <div className="input">
            <input onChange={handleChangeScore} onKeyPress={validate} placeholder={placeholder}/>
        </div>
        
    )
}

export default Input;