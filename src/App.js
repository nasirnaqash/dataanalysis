import React from 'react'
import "./App.css"
import LineChart from './Line'
import DoughnutPie from './DoughnutPie'
import Mixed from './Mixed';
import RadarChart from './Radar';
import PieChart from './Pie';

const App = () => {
  return (
    <div className='body'>
      <h1>Analytics</h1>
    
    <div className='App graphs container'>

    <div className='graph' id='line'>
    < LineChart />
    </div>  
     <div className='graph' id='dp'>
     <DoughnutPie />
     </div>
     <div>
      <PieChart className='graph' id='pie'/>
     </div>
     
     <div className='graph' id='mixed'>
     <Mixed/>
     </div> 
      <div className='graph' id='radar' >
      <RadarChart />
      </div>

    </div></div>
  )
}
export default App