import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CourseRatingChart({latestcourse}) {
  console.log(latestcourse);
  
  const data = {
    labels: latestcourse.length > 0 ? latestcourse.map((c)=>(c.coursetitle)) : ["Course","Course","Course"],
    datasets: [
      {
        label: "Course Rating",
        data: latestcourse.length > 0 ? latestcourse.map((c)=>(c.rating)):[0],
        backgroundColor: "#2196F3",   // changed to blue
        borderColor: "#2196F3",   // border in dark blue
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: latestcourse.length > 0 ? "Latest Course Ratings" : "No Data Yet",
        font: { size: 20, weight: "bold" },
       padding: {
        top: 30,    // space above the title
        bottom: 20, // space below the title
       },      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
   
      },
      x: {
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div style={{ width: "90%", height: "550px"}} className=" mt-12  ml-15">
      <Bar data={data} options={options} />
    </div>
  );
}

export default CourseRatingChart;
