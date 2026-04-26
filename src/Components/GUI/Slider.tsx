import React, { useContext, useState } from 'react'
import contextStore from '../../Context/contextStore';

const Slider = () => {
    
    const context = useContext(contextStore)
if (!context) {
  throw new Error('ContextStore is not available');
}

const { randomValue, setRandomValue } = context;
  return (
    <>
    <div>Slider</div>
    <input type = "range"  onChange= {(e)=>setRandomValue(((Number(e.target.value)/100*2)))}></input>
    <p>{randomValue}</p>
    </>
  )
}

export default Slider