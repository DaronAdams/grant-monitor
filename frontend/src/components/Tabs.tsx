import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import React, {useState} from 'react';

function MainTabContent() {
  return(
    <div style={{
      width:'100%',
      height:'100%',
      padding:'10px',
      border:'1px solid black',
      borderRadius:'10px',
      margin:'10px',
    }}>
      <h1 className="font-semibold">Grant Name</h1>

      <div>Grant Information

        <p>PI: Amy Cook</p>
        <p>PI U#: U00123456</p>
        <p>Sponsor: Amy Cook</p>
        <p>Index: 45612</p>
        <p>Cost Share Index:</p>
        <p>Cayuse:</p>
        <p>Dates:</p>
        <p>Total Amount: $10,000</p>
        <p>Yearly Amount: $2,000</p>
        <p>NCE Application Date: 01/01/2020</p>

        <div>

        </div>

      </div>
    </div>
      
  ) 
}

function SecondTabContent() {
  return(
    <div>
        Second tab content
    </div>
  ) 
}

function BudgetReportTabContent() {
  return(
    <div>
        Budget report tab content
    </div>
  ) 
}

export function TabsDefault() {
  const [activeTab, setActiveTab] = useState('Main');
  // create data for the tabs
  const data = [
    {
      label: 'Main',
      value: 'Main',
      desc: 'This is the main tab',
    },
    {
      label: 'Second',
      value: 'Second',
      desc: 'This is the second tab',
    },
    {
      label: 'Budget Report',
      value: 'Budget Report',
      desc: 'Budget report for a specific grant',
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
    <div style={{
      padding:'10px',
      marginTop:'10px',
    }}>
      <Tabs value={activeTab} setValue={setActiveTab}>
        <TabsHeader>
          {data.map(({label, value}) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: {x: 250},
            mount: {x: 0},
            unmount: {x: 250},
          }}>
          {data.map(({value}) => (
            <TabPanel key={value} value={value}>
              <>
                {value === 'Main' && <MainTabContent />}
                {value === 'Second' && <SecondTabContent />}
                {value === 'Budget Report' && <BudgetReportTabContent />}
              </>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}