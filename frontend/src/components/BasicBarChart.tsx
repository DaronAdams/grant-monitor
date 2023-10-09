import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const BasicBar = () => {

const labelProp = {

    xAxis: [
        {
            label: 'Amount of Grant Money Spent Per Month : Professor Cook'
        },
    ],

    width: 500,
    height: 400,
};

const dataProp = [

    {
      
      grant1: 10000,
      grant2: 5000,
  
      month: 'January'
    },
    {
      
      grant1: 25000,
      grant2: 15000,
      
      month: 'February'
    },
    {
      
      grant1: 47000,
      grant2: 53000,
      
      month: 'March'
    },
    {
      
      grant1: 2500,
      grant2: 16000,
      
      month: 'April'
    },
    {
      
      grant1: 17500,
      grant2: 27000,
      
      month: 'May'
    },
    {
      
      grant1: 65000,
      grant2: 60000,
      
      month: 'June'
    },
    {
      
      grant1: 30000,
      grant2: 30000,
     
      month: 'July'
    },
    {
      
      grant1: 65000,
      grant2: 60000,
   
      month: 'August'
    },
    {
      
      grant1: 75000,
      grant2: 32000,
     
      month: 'September'
    },
    {
      
      grant1: 5000,
      grant2: 15000,
      
      month: 'October'
    },
    {
      
      grant1: 45000,
      grant2: 32000,
      
      month: 'November'
    },
    {
       
      grant1: 17000,
      grant2: 65000,
      
      month: 'December'
    },
  ];
  
  const valueFormatter = (value: number) => `$${value}`;
  
  
    return (
      <BarChart

        dataset= {dataProp}
        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'grant1', label: 'Grant 1 Money Spent', valueFormatter },
        { dataKey: 'grant2', label: 'Grant 2 Money Spent', valueFormatter }]}
        layout = "horizontal"
        {...labelProp}
  
  legend={{
    direction: "row"
    }}
  sx={{
    "--ChartsLegend-rootOffsetX": "0px",
    "--ChartsLegend-rootOffsetY": "-20px",
    '--ChartsLegend-rootSpacing': "100px",
  }}
      />
    );
  
} 

export default BasicBar;