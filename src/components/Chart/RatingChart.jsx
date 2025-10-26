import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function RatingChart({rating,allrating}) {
    console.log(rating);
    
    let name;
    if (rating === "Year") {
        name =["Jan", "Feb","Mar","Apr", "May","Jun", "Jul","Aug","Sept","Oct","Nov","Dec"]
    }else if(rating === "Week"){
         name =["1 day", "2 day", "3 day", "4 day", "5 day", "6 day", "7 day"]
    }else if(rating === "Month"){
        name =["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
    }
    console.log(name);
    
    
    // Example data (you can replace this with API data)
    const data = {
        labels: name,
        datasets: [
            {
                label: "Creator Rating",
                data: allrating || null,
                // data:[1,2,3,3],
                borderColor: "orange",          // Line color
                backgroundColor: "rgba(255,165,0,0.2)", // Light orange fill
                tension: 0.4,                   // Smooth curve
                borderWidth: 2,
                pointBackgroundColor: "orange", // Point color
                pointRadius: 3,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true, // so custom width/height works
        plugins: {
            legend: {
                display: false,
                position: "top",
                labels: { color: "#333" },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // removes vertical grid lines
                },
            },
            y: {
                beginAtZero: true,
                max: 6,
                ticks: { stepSize: 1 },
                //   suggestedMax: Math.max(...rating) + 1, // small buffer above your highest value

                grid: {
                    display: false, // removes horizontal grid lines
                },
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} width={300} height={189} />
        </div>
    );
}

export default RatingChart;
