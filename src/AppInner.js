import React, { useEffect, useState } from 'react';
import Chart from './components/Chart';

import './App.css';

const generateUniqueKey = () => 'child-' + Date.now()

const AppInner = ({datas}) => {
  const [childKey, setChildKey] = useState(generateUniqueKey());
  const [datas, setDatas] = useState([...datas]);

  const reset = () => {
    setChildKey(generateUniqueKey())
    setDatas([...datas])
  };

  return (
    <div className="AppInner">
      <Chart datas={datas} key={childKey} reset={reset} />
    </div>
  );
}

export default AppInner;