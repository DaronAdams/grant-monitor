import GrantGrid from '../components/grant/GrantGrid';
import Subpage from '../components/Subpage';
import NavSpeedDial from '../components/NavSpeedDial';
import { useEffect } from 'react';
import GrantContainer from '../components/grant/GrantContainer';
import GrantData from '../interfaces/GrantData';
import { Spinner, Typography } from '@material-tailwind/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useGrantListData from '../hooks/grants/useGrantListData';
import { currentGrantDataState, grantDataListState } from '../state/grants/atom';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Grants = () => {
  const { isLoading } = useGrantListData();
  const navigate = useNavigate();
  const grantListData: GrantData[] = useRecoilValue(grantDataListState);
  const [grantData, setGrantData] = useRecoilState(currentGrantDataState);
  
  useEffect(() => {
    console.log('Grant List Data', grantListData);
  }, [grantListData]);

  const openSubpage = (grantData: ((currVal: null) => null) | null) => {
    setGrantData(grantData);
    console.log('Current Grant Data', grantData);
  }

  const closeSubpage = () => {
    setGrantData(null);
  }

  const handleCreateClick = () => {
    navigate('/grant/create')
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
              <Typography variant="h3" color="blue" style={{ padding: '10px', paddingTop: '20px' }}>University of Memphis Grants</Typography>
              <Typography variant="paragraph" style={{ padding: '10px' }}>Welcome, Corinne!</Typography>
              <div className='px-4'>
                <Button
                  onClick={handleCreateClick}
                  variant='contained'
                >
                  Create Grant
                </Button>
              </div>
              <div className="flex flex-row justify-between items-center p-4">
                <GrantGrid openSubpage={openSubpage} allGrantsData={grantListData} />
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