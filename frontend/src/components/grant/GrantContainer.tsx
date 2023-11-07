import React, {useState} from 'react';
//import { useAuth } from '../../hooks/context/authContext';
import {
  IconButton,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Main from './tabs/Main';
import Visuals from './tabs/Visuals';
import BudgetReport from './tabs/BudgetReport';
import EffortReport from './tabs/EffortReport';
import EmployeeReport from './tabs/EmployeeReport';
import LaborReport from './tabs/LaborReport';
import GrantData from '../../interfaces/GrantData';

interface GrantShowPageProps {
  grantData: GrantData;
  closeSubpage: (() => void);
}

const Grant:React.FC<GrantShowPageProps> = ({grantData, closeSubpage}) => {
  //const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('Main');

  // create data for the tabs
  const tabData = [
    {
      label: 'Main',
      value: 'Main',
      desc: 'This is the main tab',
    },
    {
      label: 'Visuals',
      value: 'Visuals',
      desc: 'View a report of...',
    },
    {
      label: 'Budget Report',
      value: 'Budget Report',
      desc: 'View a report of...',
    },
    {
      label: 'Effort Report',
      value: 'Effort Report',
      desc: 'View a report of...',
    },
    {
      label: 'Employee Report',
      value: 'Employee Report',
      desc: 'View a report of...',
    },
    {
      label: 'Labor Report',
      value: 'Labor Report',
      desc: 'View a report of...',
    },
  ];

  //   const renderTabContent = () => {
  //     switch (activeTab) {
  //       case 'Main':
  //         return <MainTabContent />;
  //       case 'Second':
  //         return <SecondTabContent />;
  //       case 'Budget Report':
  //         return <BudgetReportTabContent />;
  //       default:
  //         return null;
  //     }
  //   };

  return ( 
    <>
      <div className="flex flex-col">
        <div style={{
          padding:'10px',
          marginTop:'10px',
        }}>
          

          <Tabs value={activeTab} setValue={setActiveTab}>
            <div className="flex flex-row items-center">
              <IconButton color="red" onClick={closeSubpage}>
                <ArrowBackIcon />
              </IconButton>
              <div className="flex-grow"></div>
              <TabsHeader>
                {tabData.map(({label, value}) => (
                  <Tab key={value} value={value} style={{ whiteSpace: 'nowrap', margin: '0 12px' }} className="flex-grow"
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <div className="flex-grow"></div>
            </div>
            <TabsBody
              animate={{
                initial: {x: 250},
                mount: {x: 0},
                unmount: {x: 250},
              }}>
              {tabData.map(({value}) => (
                <TabPanel key={value} value={value}>
                  <>
                    {value === 'Main' && <Main grantData={grantData} />}
                    {value === 'Visuals' && <Visuals grantData={grantData} />}
                    {value === 'Budget Report' && <BudgetReport />}
                    {value === 'Effort Report' && <EffortReport />}
                    {value === 'Employee Report' && <EmployeeReport />}
                    {value === 'Labor Report' && <LaborReport />}
                  </>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </>
  );
}
 
export default Grant;