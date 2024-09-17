import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ arr = [], currency, days }) => {
    const prices = [];
    const dates = [];

    for (let i = 0; i < arr.length; i++) {
        // Convert timestamp to Date object
        const date = new Date(arr[i][0]);

        // For '24h', use the time, otherwise use the full date
        if (days === '24h') {
            dates.push(date.toLocaleTimeString()); // Show time for 24h
        } else {
            dates.push(date.toLocaleDateString()); // Show date for other periods
        }

        prices.push(arr[i][1]); // Price is already fine
    }

    const data = {
        labels: dates,
        datasets: [
            {
                label: `Price in ${currency}`,
                data: prices,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    };

    return (
        <Line
            options={{
                responsive: true,
            }}
            data={data}
        />
    );
};

export default Chart;
