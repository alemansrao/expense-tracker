"use client"
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { color } from 'chart.js/helpers';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const BarChart = () => {
    const [primaryColor, setPrimaryColor] = useState('#eee');
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Expenses',
                data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                backgroundColor: primaryColor,
                borderColor: primaryColor,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: primaryColor, // Set Y-axis label color
                },
            },
            x: {
                ticks: {
                    color: primaryColor, // Set X-axis label color
                },
            },
        },plugins: {
            legend: {
                labels: {
                    color: primaryColor, // Set legend label color
                },
            },
            title: {
                display: true,
                text: 'Monthly Expenses',
                color: primaryColor, // Set title color
            },
        },
    };

    return <>
        <Bar data={data} options={options} /></>;
};

export default BarChart;
