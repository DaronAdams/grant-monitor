import React, {useEffect, useState} from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import GrantData from '../../../interfaces/GrantData';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Divider from '@mui/material/Divider';
import { Spinner } from '@material-tailwind/react';

import getDaysPassedAndRemaining from '../../../utils/getDaysPassedAndRemaining';

import GrantPIGrid from '../GrantPIGrid';
import GrantEmployeeGrid from '../GrantEmployeesGrid';

import { useRecoilValue } from 'recoil';

import useGrantEmployeeGridRowListData from '../../../hooks/grants/useGrantEmployeeGridListData';
import { grantEmployeeGridRowDataListState } from '../../../state/grantEmployeeGridRow/atom';
import GrantEmployeeGridRow from '../../../interfaces/GrantEmployeeGridRow';

import useGrantPIGridRowListData from '../../../hooks/grants/useGrantPIGridListData';
import { grantPIGridRowDataListState } from '../../../state/grantPIGridRow/atom';
import GrantPIGridRow from '../../../interfaces/GrantPIGridRow';

interface GrantMainTabProps {
  grantData: GrantData;
}

interface DateDataProps {
  daysPassed: number,
  daysRemaining: number
}

interface GrantInfoProps {
  description: string,
  value: string | number,
  hasDivider?: boolean,
}

interface CenteredContainerProps {
  children: React.ReactNode;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {children}
  </div>
);

const CardContainer: React.FC<{ title: string, children: any }> = ({ title, children }) => (
  <Card style={{ flex: '1', minWidth: 0, margin: '10px', overflow: 'hidden' }}>
    <CardContent style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Divider sx={{marginBottom: 1}}/>
      <div style={{ flex: '1', overflow: 'auto' }}>{children}</div>
    </CardContent>
  </Card>
);

function formatDate(date: Date | null | undefined): string {

  if (date == null || date == undefined) {
    return 'N/A';
  }

  const thisDate = new Date(date); // the fact that I have to do this is idiotic

  console.log(typeof(thisDate));

  return thisDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const GrantInfo: React.FC<GrantInfoProps> = (grantInfo) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true after a short delay (you can adjust the duration)
    const delay = setTimeout(() => {
      setLoaded(true);
    }, 150);

    return () => clearTimeout(delay); // Cleanup timeout on unmount
  }, []);

  const textStyle: React.CSSProperties = {
    color: grantInfo.value === 'N/A' || grantInfo.value === null ? 'lightgray' : 'inherit',
    transition: 'opacity 0.5s ease-in-out', // CSS transition for opacity
    opacity: loaded ? 1 : 0, // Start with opacity 0 and animate to 1 when loaded
  };

  return (
    <Typography variant="body1">
      <strong>{grantInfo.description}:</strong>
      <span style={textStyle}>{' ' + (grantInfo.value || 'N/A')}</span>
      {grantInfo.hasDivider !== false && <Divider sx={{ backgroundColor: '#ffffff' }} />}
    </Typography>
  );
};

ChartJS.register(ArcElement, Tooltip, Legend);


const Main:React.FC<GrantMainTabProps> = ({grantData}) => {

  const navigate = useNavigate();
  const handleDeleteClicked = () => {
    const confirmed = window.confirm('Are you sure you want to delete this grant?');
    if (confirmed) {
      // Stuff
      axios
        .delete('/grant/delete/' + grantData.id)
        .then((response) => {
          console.log('Response', response)
          navigate(0);
        });
      
    }
  }

  const { employeeRowsLoading } = useGrantEmployeeGridRowListData(grantData.id);
  const { piRowsLoading } = useGrantPIGridRowListData(grantData.id);
  const grantEmployeeGridRowListData: GrantEmployeeGridRow[] = useRecoilValue(grantEmployeeGridRowDataListState);
  //const [grantEmployeeRowData, setGrantEmployeeRowData] = useRecoilState(currentGrantEmployeeGridRowDataState);
  const grantPIGridRowListData: GrantPIGridRow[] = useRecoilValue(grantPIGridRowDataListState);

  useEffect(() => {
    console.log('Grant employee Data', grantEmployeeGridRowListData);
  }, [grantEmployeeGridRowListData]);

  useEffect(() => {
    console.log('Grant PI Data', grantPIGridRowListData);
  }, [grantPIGridRowListData]);
  
  const dateDataHolder: DateDataProps = getDaysPassedAndRemaining(grantData.startDate, grantData.endDate)

  const lifetimeData = {
    labels: ['Days Passed', 'Days Left'],
    datasets: [
      {
        label: '# of Days',
        data: [dateDataHolder.daysPassed, dateDataHolder.daysRemaining],
        backgroundColor: [
          'rgb(170, 18, 18, 0.7)',
          'lightgray',
        ],
      },
    ],
  };

  const spendingData = {
    labels: ['Money Spent', 'Money Left'],
    datasets: [
      {
        label: '$USD',
        data: [15000, 36000],
        backgroundColor: [
          'rgb(18, 170, 18, 0.7)',
          'lightgray',
        ],
      },
    ],
  };

  return !(piRowsLoading || employeeRowsLoading) && (
    <div style={{
      width:'100%',
      height:'100%',
      padding:'10px',
      border:'1px solid gray',
      borderRadius:'10px',
      margin:'10px',
    }}>
      <h1 className="font-semibold">Grant Name</h1>
  
      <div>
        <p>{`Account: ${grantData.account}`}</p>
        <p>{`Cayuse: ${grantData.cayuse}`}</p>
        <p>{`Fund: ${grantData.fund}`}</p>
        <p>{`Organization: ${grantData.organization}`}</p>
        <p>{`Program: ${grantData.program}`}</p>
        <p>{`Sponsor: ${grantData.sponsor}`}</p>
        <p>{`Index: ${grantData.index}`}</p>
        <p>{`Cost-Share Index: ${grantData.costShareIndex}`}</p>
        <p>{`NCE App Date: ${grantData.nceAppDate}`}</p>
        <p>{`Start Date: ${grantData.startDate}`}</p>
        <p>{`End Date: ${grantData.endDate}`}</p>
        <p>{`Status: ${grantData.status}`}</p>
        <p>{`Total Amount: $${grantData.totalAmount}`}</p>
        <p>{`Yearly Amount: ${grantData.yearlyAmount}`}</p>
        <p>{`Notes: ${grantData.notes || 'N/A'}`}</p>
        <p>{`Created At: ${grantData.createdAt}`}</p>
        <p>{`Updated At: ${grantData.updatedAt}`}</p>
      </div>
      <div className='py-3'>
        <Button
          onClick={handleDeleteClicked}
        >
          Delete
        </Button>
      </div>

      <Typography variant="h4" component="div" sx={{ paddingBottom: 1, paddingTop: 1, paddingLeft: 1, border:'1px solid lightgray', borderRadius:'10px' }}>
        Grant Index: {grantData.index}
      </Typography>

      <CenteredContainer>
        <CardContainer title="Complete Info">
          <GrantInfo description={'Account'} value={grantData.account } />
          <GrantInfo description='Cayuse' value={grantData.cayuse} />
          <GrantInfo description='Fund' value={grantData.fund} />
          <GrantInfo description='Organization' value={grantData.organization} />
          <GrantInfo description='Program' value={grantData.program} />
          <GrantInfo description='Sponsor' value={grantData.sponsor} />
          <GrantInfo description='Cost-Share Index' value={grantData.costShareIndex} />
          <GrantInfo description='NCE App Date' value={formatDate(grantData.nceAppDate)} />
          <GrantInfo description='Start Date' value={formatDate(grantData.startDate)} />
          <GrantInfo description='End Date' value={formatDate(grantData.endDate)} />
          <GrantInfo description='Status' value={grantData.status} />
          <GrantInfo description='Total Amount' value={`$${grantData.totalAmount}`} />
          <GrantInfo description='Yearly Amount' value={`$${grantData.yearlyAmount}`} />
          <GrantInfo description='Created At' value={formatDate(grantData.createdAt)} />
          <GrantInfo description='Updated At' value={formatDate(grantData.updatedAt)} />
        </CardContainer>

        <CardContainer title="Lifetime">
          <Pie data={lifetimeData} />
        </CardContainer>

        <CardContainer title="Spending">
          <Pie data={spendingData} />
        </CardContainer>
      </CenteredContainer>

      <CenteredContainer>
        <CardContainer title="PI and Co-PI's">
          {grantEmployeeGridRowListData.length > 0 ? (
            <GrantPIGrid grantPIData={grantPIGridRowListData}></GrantPIGrid>
          ) : (
            <p>No data available</p>
          )}
        </CardContainer>
      </CenteredContainer>

      <CenteredContainer>
        <CardContainer title="Employees">
          {grantEmployeeGridRowListData.length > 0 ? (
            <GrantEmployeeGrid grantEmployeeData={grantEmployeeGridRowListData} />
          ) : (
            <p>No data available</p>
          )}
        </CardContainer>
      </CenteredContainer>

      <CenteredContainer>
        <CardContainer title="Notes">
          <Typography variant="body2" component="div">
            {grantData.notes || 'No notes for this grant'}
          </Typography>
        </CardContainer>
      </CenteredContainer>
    </div>
    
  ) || (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh'}}>
      <Spinner color="blue" className="flex-grow" />
    </div>
  )
}

export default Main;