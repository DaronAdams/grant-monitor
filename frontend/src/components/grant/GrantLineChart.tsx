import { LineChart } from '@mui/x-charts/LineChart';
import { Typography } from '@mui/material';
import React from 'react';

interface LineChartProps {
  startDate: Date;
  endDate: Date;
  TotalAmount: number;
  transactions: number[];
}

const GrantLineChart: React.FC<LineChartProps> = ({ startDate, endDate, TotalAmount, transactions }) => {
  // Duration of a grant in months
  const durationInMonths2 = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;

  // Calculate the burn rate for each month
  const burnRateData = Array.from({ length: durationInMonths2 }, (_, index) => (index + 1) * (TotalAmount / durationInMonths2));

  // Random Transaction data
  const generateAccumulatingData = (): number[] => {
    const monthsArray = Array.from({ length: durationInMonths2 }, () => 0);
    let counter = 0;
    transactions.forEach((amount, index) => {
      monthsArray[index] = monthsArray[counter] + amount;
      counter = index;
    });
    return monthsArray;
  };

  const grant1Data = generateAccumulatingData();
  const grant2Data = burnRateData;

  // Labels for the line chart starting from the StartDate of a grant to the EndDate of a grant
  const xLabels = Array.from({ length: durationInMonths2 }, (_, index) => {
    const monthIndex = (startDate.getUTCMonth() + index + 1) % 12;
    const year = startDate.getUTCFullYear() + Math.floor((startDate.getUTCMonth() + index) / 12); // Calculate the year
    return `${new Date(Date.UTC(year, monthIndex)).toLocaleString('default', { month: 'short' })} ${year}`;
  });

  const valueFormatter = (value: number) => `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  const valueFormatterWithoutDecimals = (value: number) => `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  // Ensure data consistency before rendering the chart
  if (xLabels.length === grant1Data.length && xLabels.length === grant2Data.length) {
    return (
      <div>
        <Typography variant="h5" align="center" gutterBottom style={{ textAlign: 'right', paddingRight: '400px', paddingTop: '30px' }}>
          Project Burn Rate
        </Typography>

        <LineChart
          width={1000}
          height={500}
          series={[
            { curve: 'linear', data: grant1Data, label: 'Total Spent', valueFormatter, color: '#B491C9' },
            { curve: 'linear', data: grant2Data, label: 'Burn Rate', valueFormatter, color: '#9592CB' },
          ]}
          xAxis={[
            {
              scaleType: 'point',
              data: xLabels,
            },
          ]}
          yAxis={[
            {
              label: 'Amount of Money',
              valueFormatter: valueFormatterWithoutDecimals,
            },
          ]}
          margin={{
            left: 95,
            right: 80,
            top: 50,
            bottom: 30,
          }}
          sx={{
            '& .MuiChartsAxis-label': {
              transform: 'rotate(-90deg) translateY(-55px)',
            },
            '--ChartsLegend-rootOffsetX': '10px',
            '--ChartsLegend-rootOffsetY': '-20px',
            '--ChartsLegend-rootSpacing': '50px',
            backgroundColor: '#F0F0F0',
          }}
        />
      </div>
    );
  } else {
    
    console.error('Invalid or inconsistent data:', xLabels, grant1Data, grant2Data);
    return null; 
  }
};

export default GrantLineChart;
