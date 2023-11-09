import { HomePageSidebar } from '../components/Sidebar';
import GrantGrid from '../components/grant/GrantGrid';
import Subpage from '../components/Subpage';
import NavSpeedDial from '../components/NavSpeedDial'
//import { useAuth } from '../hooks/context/authContext';
import { useState, useEffect } from 'react';
import GrantContainer from '../components/grant/GrantContainer';
import GrantData from '../interfaces/GrantData';
import { Spinner, Typography } from '@material-tailwind/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useGrantListData from '../hooks/grants/useGrantListData';
import { currentGrantDataState, grantDataListState } from '../state/grants/atom';


const Grants = () => {
  const { isLoading } = useGrantListData();
  const grantListData: GrantData[] = useRecoilValue(grantDataListState);
  const [grantData, setGrantData] = useRecoilState(currentGrantDataState);
  

  useEffect(() => {
    console.log('Grant List Data', grantListData);
  }, [grantListData]);

  const openSubpage = (grantData: ((currVal: null) => null) | null) => {
    setGrantData(grantData);
  }

  const closeSubpage = () => {
    setGrantData(null);
  }

  return ( 
    <div className="flex flex-row">
      <NavSpeedDial />
      {!isLoading && (
        grantData !== null && (
          <Subpage>
            <GrantContainer grantData={grantData} closeSubpage={closeSubpage} />
          </Subpage>
        ) || 
          (
            <Subpage>
              <Typography variant="h3" color="blue" style={{ padding: '10px' }}>University of Memphis Grants</Typography>
              <Typography variant="paragraph" style={{ padding: '10px' }}>Welcome, Corinne!</Typography>
              <div className="flex flex-row justify-between items-center p-4">
                <GrantGrid openSubpage={openSubpage} allGrantsData={grantListData}/>
              </div>
            </Subpage>
          )
      ) ||
        (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh'}}>
            <Spinner color="blue" className="flex-grow" />
          </div>
        )}
    </div>
  );
}
 
export default Grants;