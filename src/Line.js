import React, {useState,useEffect} from 'react';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import {Line} from 'react-chartjs-2';
import axios from 'axios';

Chart.register(CategoryScale);


export default function LineChart() {
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
    const newData = data.slice(3,100)
    const uniqueData = [...new Set(newData.map(obj=>obj.topic))]
    const chartData = {
      labels: uniqueData.map(item => item),
      datasets: [
        {
          label: 'Intensity',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: newData.map(item => item.intensity)
        },
        {
          label: 'Likelihood',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(245,40,145,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: newData.map(item => item.likelihood)
        }
      ]
    };

    setChartData(chartData);
  
  }
  fetchData();
},[]);
    return (
      <div className='graph line'>
        <Line
          data={chartData}
          options={{
            title:{
              display:true,
              text:'LikeLihood and Intensity as per Sectors',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }