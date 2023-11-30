import { BarChart } from '@mui/x-charts/BarChart';
import { HighlightScope } from '@mui/x-charts';
import { Typography } from '@mui/material';
import React from 'react';



interface BarChartProps {
  startDate: Date;
  endDate: Date;
  TotalAmount: number;
  transactions: number[];
}


const GrantBarChart: React.FC<BarChartProps> = ({ startDate, endDate, TotalAmount, transactions }) => {



  const [highlighted, setHighlighted] = React.useState('item');
  const [faded, setFaded] = React.useState('global');

  const durationInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;
  const durationInMonths2 = (endDate.getUTCMonth() - startDate.getUTCMonth()) + 12 * (endDate.getUTCFullYear() - startDate.getUTCFullYear());

  // Calculate the burn rate for each month without accumulation
  const burnRate = TotalAmount / durationInMonths;

  const generateBarChartData = () => {
    if (!Array.isArray(transactions)) {
      return [];
    }

    const monthsArray = Array.from({ length: durationInMonths }, () => 0);

    transactions.forEach((amount, index) => {
      monthsArray[index] = amount;
    });

    const monthLabels = Array.from({ length: durationInMonths }, (_, index) => {
      const monthIndex = (startDate.getUTCMonth() + index + 1) % 12;
      const year = startDate.getUTCFullYear() + Math.floor((startDate.getUTCMonth() + index) / 12); // Calculate the year
      return `${new Date(Date.UTC(year, monthIndex)).toLocaleString('default', { month: 'short' })} ${year}`;
    });

    const resultData = monthLabels.map((label, index) => {
      return {
        grant1: monthsArray[index],
        grant2: burnRate,
        month: label,
      };
    });

    console.log('resultData:', resultData);

    return resultData;
  };


  const dataProp = generateBarChartData();

  const valueFormatter = (value: number) => `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  const valueFormatterWithoutDecimals = (value: number) => `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  const labelProp = {
    yAxis: [
      {
        label: 'Amount of Money',
        interval: 0,
        valueFormatter: valueFormatterWithoutDecimals,
      },
    ],
  };

  const xLabels = dataProp.map(item => item.month);




  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom style={{ textAlign: 'right', paddingRight: '400px', paddingTop: '30px' }}>
        Monthly Burn Rate

      </Typography>



      <BarChart
        width={1000}
        height={500}
        dataset={dataProp}
        xAxis={[{ scaleType: 'band', data: xLabels }]}
        series={[
          { dataKey: 'grant1', label: 'Expenses', valueFormatter, color: '#B491C9', highlightScope: { highlighted, faded } as HighlightScope },
          { dataKey: 'grant2', label: 'Burn Rate Avg', valueFormatter, color: '#9592CB', highlightScope: { highlighted, faded } as HighlightScope },
        ]}



        layout="vertical"
        {...labelProp}

        legend={{
          direction: 'row',
        }}

        margin={{
          left: 95,
          right: 80,
          top: 50,
          bottom: 60,
        }}

        sx={{
          '& .MuiChartsAxis-label': {
            transform: 'rotate(-90deg) translateY(-55px)',
          },

          '--ChartsLegend-rootOffsetX': '0px',
          '--ChartsLegend-rootOffsetY': '445px',
          '--ChartsLegend-rootSpacing': '50px',

          backgroundColor: '#F0F0F0',


        }}

        tooltip={{
          trigger: 'axis',

        }}

      />




      <style>{`
      .MuiPopper-root {
        z-index: 9999 !important; 
      }
      
    `}</style>

    </div>


  );
};

export default GrantBarChart;