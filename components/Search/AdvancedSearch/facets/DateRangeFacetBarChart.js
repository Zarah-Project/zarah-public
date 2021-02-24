import React, {useState, useEffect} from "react";
import { Bar } from "react-chartjs-2";

const DateRangeFacetBarChart = ({data, highlight}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      const sortedData = data.sort((a, b) => (a.text > b.text) ? 1 : -1);
      const chartData = [];

      if (sortedData.length > 0) {
        const minYear = _.head(sortedData).text;
        const maxYear = _.last(sortedData).text;
        const years = _.range(minYear, maxYear);
        years.push(maxYear)
        years.map(year => {
          const foundData = sortedData.find(d => d.text === year.toString());
          chartData.push(
            {
              text: year.toString(),
              count: foundData ? foundData.count : 0
            })
        });
      }

      setChartData(chartData);
    }, [data]);

    const calculateBackground = () => {
      const leftCount = chartData.find(d => parseInt(d.text) === highlight[0]);
      const rightCount = chartData.find(d => parseInt(d.text) === highlight[1]);

      if (leftCount && rightCount) {
        return (
          chartData.map(cd => (
            cd.text >= leftCount.text && cd.text <= rightCount.text ? "rgba(196, 96, 118, 0.4)" : "rgba(102, 102, 102, 0.4)"
          ))
        );
      } else {
         return []
      }
    };

    const barData = {
      labels: chartData.map((d) => d.text),
      datasets: [
        {
          backgroundColor: calculateBackground(),
          hoverBackgroundColor: "#c46076",
          data: chartData.map((d) => d.count),
          barPercentage: 0.9,
          categoryPercentage: 1.0
        }
      ]
    };

    const options = {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            display: false
          }
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              min: 0
            }
          }
        ]
      }
    };
    return <Bar data={barData} options={options} />;
};

export default DateRangeFacetBarChart;
