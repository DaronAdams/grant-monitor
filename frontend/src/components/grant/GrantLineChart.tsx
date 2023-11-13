import { LineChart } from '@mui/x-charts/LineChart';
import { Typography } from '@mui/material';
import React from 'react';

interface LineChartProps {
  startDate: Date;
  endDate: Date;
  TotalAmount: number;
}

const GrantLineChart: React.FC<LineChartProps> = ({ startDate, endDate, TotalAmount }) => {

  //Duration of a grant in months
  const durationInMonths = (endDate.getUTCMonth() - startDate.getUTCMonth()) + 12 * (endDate.getUTCFullYear() - startDate.getUTCFullYear());

  // Calculate the burn rate for each month
  const burnRateData = Array.from({ length: durationInMonths }, (_, index) => (index + 1) * (TotalAmount / durationInMonths));

  //Random Transaction data
  const generateAccumulatingData = () => {
    let accumulatedValue = 0;
    return Array.from({ length: durationInMonths }, () => {
      const randomIncrement = Math.floor(Math.random() * (TotalAmount - accumulatedValue + 1));
      accumulatedValue += randomIncrement;
      return accumulatedValue;
    });
  };

  const grant1Data = generateAccumulatingData();
  const grant2Data = burnRateData;

  //Labels for the line chart starting from the StartDate of a grant to the EndDate of a grant

  const xLabels = Array.from({ length: durationInMonths }, (_, index) => {
    const month = (startDate.getUTCMonth() + index + 1) % 12; // Months cannot go beyond December 
    return new Date(Date.UTC(startDate.getUTCFullYear(), month)).toLocaleString('default', { month: 'short' });
  });

  const valueFormatter = (value: number) => `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  const valueFormatterWithoutDecimals = (value: number) => `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;


  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom style={{ textAlign: 'right', paddingRight: '125px', paddingTop:'30px'}}>
        Project Burn Rate
      </Typography>

      <LineChart
        width={500}
        height={500}

        series={[
          { curve: 'linear', data: grant1Data, label: 'Total Spent', valueFormatter, color: '#B491C9'},
          { curve: 'linear', data: grant2Data, label: 'Burn Rate', valueFormatter, color: '#9592CB'},
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
            transform: 'rotate(-90deg) translateY(-55px)',  // Styles for the y-axis label  // Adjust the origin of rotation if needed  // Align text to the right
          },
          '--ChartsLegend-rootOffsetX': '10px',
          '--ChartsLegend-rootOffsetY': '-20px',
          '--ChartsLegend-rootSpacing': '50px',
          
        }}
      />
    </div>
  );
}

export default GrantLineChart;