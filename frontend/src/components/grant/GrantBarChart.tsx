import { BarChart } from '@mui/x-charts/BarChart';
import { Typography } from '@mui/material';
import React from 'react';
//import axios from 'axios'

/*interface Transaction {
  id: number;
  amount: number;
  date: Date;
  
}
*/

interface BarChartProps {
  startDate: Date;
  endDate: Date;
  TotalAmount: number;
}

const GrantBarChart: React.FC<BarChartProps> = ({ startDate, endDate, TotalAmount }) => {
  const durationInMonths = (endDate.getUTCMonth() - startDate.getUTCMonth()) + 12 * (endDate.getUTCFullYear() - startDate.getUTCFullYear());

  // Calculate the burn rate for each month without accumulation
  const burnRate = TotalAmount / durationInMonths;


  /*
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>('/api/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [] 
  */

  /*const generateBarChartData = () => {
    let remainingAmount = TotalAmount;

    return transactions.map(transaction => {
      const { amount, date } = transaction;
      remainingAmount -= amount;

      return {
        grant1: amount,
        grant2: burnRate,
        month: new Date(date).toLocaleString('default', { month: 'short' }),
      };
    });
  };
  */

  const generateBarChartData = () => {
    let remainingAmount = TotalAmount;
    return Array.from({ length: durationInMonths }, (_, index) => {
      const grant1 = Math.floor(Math.random() * (remainingAmount + 1));
      remainingAmount -= grant1;

      return {
        grant1,
        grant2: burnRate,
        month: new Date(Date.UTC(startDate.getUTCFullYear(), (startDate.getUTCMonth() + index + 1) % 12)).toLocaleString('default', { month: 'short' }),
      };
    });
  };

  const dataProp = generateBarChartData();

  const valueFormatter = (value: number) => `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;

  const valueFormatterWithoutDecimals = (value: number) => `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  const labelProp = {
    yAxis: [ 
      {
        label: 'Monthly Burn Rate',
        interval: 0,
        valueFormatter: valueFormatterWithoutDecimals,
      },
    ],
  };

  const xLabels = dataProp.map(item => item.month);


  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom style={{ textAlign: 'right', paddingRight: '125px', paddingTop: '30px'}}>
        Monthly Burn Rate
      </Typography>

      <BarChart
        width={500}
        height={500}
        dataset={dataProp}
        xAxis={[{ scaleType: 'band', data: xLabels }]}
        series={[
          { dataKey: 'grant1', label: 'Expenses', valueFormatter, color: '#B491C9' },
          { dataKey: 'grant2', label: 'Burn Rate Avg', valueFormatter, color: '#9592CB' },
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
         

          
        }}


      />
    </div>
  );
};

export default GrantBarChart;