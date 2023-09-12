import React,{useEffect,useState} from 'react';
import { Radar } from 'react-chartjs-2';
import axios from 'axios';




const RadarChart = () => {
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
      const newData = data.slice(3,20)
      const uniqueData = [];
    const combinations = new Set();
    newData.forEach(obj=>{
      const combination = `${obj.likelihood}-${obj.country}-${obj.intensity}`
      if(!combinations.has(combination)){
        combinations.add(combination);
        uniqueData.push(obj)
      }
    });
  
      const chartData = {
        labels: uniqueData.map((item)=>
          item.country
        )
        ,
        datasets: [{
          label: 'Intensity',
          data: uniqueData.map((item)=>item.intensity),
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Likelihood',
          data: uniqueData.map((item)=>item.likelihood),
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      };
      setChartData(chartData);
    }
    
    fetchData();
  },[]);
 
  return (
    <div>
        <Radar
        data= {chartData}
        options= {{
          elements: {
            line: {
              borderWidth: 3
            }
          }
        }}/>
    </div>
  )
}

export default RadarChart