import React, {useState,useEffect} from 'react'
import { Pie } from 'react-chartjs-2';
import axios from 'axios'

const PieChart = () => {
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
        const uniqueData = [...new Set(newData.map(obj=>obj.pestle))]
        const pestleCounts = {};
        newData.forEach(element => {
          const pestle = element.pestle;
          pestleCounts[pestle] = (pestleCounts[pestle]||0)+1
        });
        const counts = Object.values(pestleCounts)
        console.log(counts)
        const chartData =  {
          labels:uniqueData.map((item)=>item),
          datasets: [
            {
              label: 'Impact',
              backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4'
              ],
              hoverBackgroundColor: [
              '#501800',
              '#4B5000',
              '#175000',
              '#003350',
              '#35014F'
              ],
              data:counts
            }
          ]
        };
        setChartData(chartData);
      }
      fetchData();
    },[]);
  return (
    <div>
          <Pie
            data={chartData}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
    </div>
  )
}

export default PieChart;