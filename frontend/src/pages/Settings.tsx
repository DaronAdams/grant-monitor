import { HomePageSidebar } from '../components/Sidebar';
import Subpage from '../components/Subpage';
import NavSpeedDial from '../components/NavSpeedDial'
//import { useAuth } from '../hooks/context/authContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { grantListEndpoint } from '../constants/endpoints';
import { Spinner, Typography } from '@material-tailwind/react';
import { ChangePassword } from '../components/ChangePassword';


const HomePage = () => {
  //const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  /*
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

  */


  return ( 
    <>
      <div className="flex flex-row">
        <NavSpeedDial />

        <div className="flex flex-col">
          <ChangePassword />

        </div>
      </div>
    </>

  );
}
 
export default HomePage;