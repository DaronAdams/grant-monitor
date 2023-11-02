import { HomePageSidebar } from '../components/Sidebar';
import GrantGrid from '../components/grant/GrantGrid';
import Subpage from '../components/Subpage';
import NavSpeedDial from '../components/NavSpeedDial'
//import { useAuth } from '../hooks/context/authContext';
import { useState, useEffect } from 'react';
import GrantContainer from '../components/grant/GrantContainer';
import GrantData from '../interfaces/GrantData';
import axios from 'axios';
import { grantListEndpoint } from '../constants/endpoints';
import { Spinner, Typography } from '@material-tailwind/react';


const Grants = () => {
  //const { user } = useAuth();
  const [grantData, setGrantData] = useState<GrantData | null>(null);
  const [allGrantsData, setAllGrantsData] = useState<GrantData[]>([]);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    axios
      .get(grantListEndpoint)
      .then((response) => {
        console.log('Response', response.data.grants);
        setAllGrantsData(response.data.grants);
        setIsLoading(false);
      })
  }, []);

  const openSubpage = (grantData: GrantData) => {
    setGrantData(grantData);
  }

  const closeSubpage = () => {
    setGrantData(null);
  }

  return ( 
    <>
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
                <GrantGrid openSubpage={openSubpage} allGrantsData={allGrantsData}/>
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
    </>

  );
}
 
export default Grants;