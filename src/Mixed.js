import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import {useState,useEffect} from 'react';
import axios from 'axios';

const Mixed = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
        data: []
    }]
});

  
useEffect(()=>{
  async function fetchData(){
    const response = await axios.get('http://localhost:2000/api/data');
    const data = response.data;
    const newData = data.slice(3,11)
    const uniqueData = [];
    const combinations = new Set();
    newData.forEach(obj=>{
      const combination = `${obj.likelihood}-${obj.source}`
      if(!combinations.has(combination)){
        combinations.add(combination);
        uniqueData.push(obj)
      }
    });
    console.log(uniqueData);
    
    const chartData = {
      labels:uniqueData.map((item)=>item.source),
      datasets: [{
        label: "Source Likelihood",
        data: uniqueData.map((item)=>item.likelihood),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };
  
    setChartData(chartData);
  }
  fetchData();
},[]);
  return (
    <div>
        <PolarArea
            data={chartData}
            options={{
              title:{
                display:true,
                text:'',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              },
              filler:{
                propogate : false
              }
            }}
          />
          <h6>Source Likelihood</h6>

    </div>
  )
}

export default Mixed