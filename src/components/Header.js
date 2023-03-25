import React from 'react';

const dropdownA = ['The Mother']

class Header extends React.Component {
  render() {
    return (
        <div className="header-container">
            <div className="header-inner"><div>Emotional Intensity Scene by Scene</div><div><span className="italic">{dropdownA[0]}</span></div></div>
        </div>
        
    )
  }
}

export default Header;