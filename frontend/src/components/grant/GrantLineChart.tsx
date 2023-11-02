import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const GrantLineChart = () => {

  const grant1Data = [10000, 25000, 47000, 2500, 17500, 65000, 30000, 65000, 75000, 5000, 45000, 17000];
  const grant2Data = [5000, 15000, 53000, 16000, 27000, 60000, 30000, 60000, 32000, 15000, 32000, 65000];
  const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',

  ];


  return (
    <LineChart
      width={500}
      height={300}
      series={[
        { data: grant1Data, label: 'Grant 1', yAxisKey: 'leftAxisId' },
        { data: grant2Data, label: 'Grant 2', yAxisKey: 'rightAxisId' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
      rightAxis="rightAxisId"
    />
  );
}



export default GrantLineChart;