import GrantGrid from '../components/grant/GrantGrid';
import Subpage from '../components/Subpage';
import NavSpeedDial from '../components/NavSpeedDial'
import { useState, useEffect } from 'react';
import GrantContainer from '../components/grant/GrantContainer';
import GrantData from '../interfaces/GrantData';
import { Spinner, Typography } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { fetchGrants } from '../redux/actions/fetchGrants';
import { useSelector } from 'react-redux';
import GrantState, { RootState } from '../redux/store/store';

const Grants = () => {
  const grants: GrantData[] = useSelector((state: RootState) => state.grant.grants);
  const dispatch = useDispatch();

  console.log(grants);
  


  useEffect(() => {
    dispatch(fetchGrants());
  }, []);

  const openSubpage = (grantData: GrantData) => {
    //setGrantData(grantData);
  }

  const closeSubpage = () => {
    //setGrantData(null);
  }

  return (
    <>
      <div>
        Stuff
      </div>
    </>
  );

  // return ( 
  //   <>
  //     <div className="flex flex-row">
  //       <NavSpeedDial />
  //       {!isLoading && (
  //         grantData !== null && (
  //           <Subpage>
  //             <GrantContainer grantData={grantData} closeSubpage={closeSubpage} />
  //           </Subpage>
  //         ) || 
  //         (
  //           <Subpage>
  //             <Typography variant="h3" color="blue" style={{ padding: '10px' }}>University of Memphis Grants</Typography>
  //             <Typography variant="paragraph" style={{ padding: '10px' }}>Welcome, Corinne!</Typography>
  //             <div className="flex flex-row justify-between items-center p-4">
  //               <GrantGrid openSubpage={openSubpage} allGrantsData={allGrantsData}/>
  //             </div>
  //           </Subpage>
  //         )
  //       ) ||
  //       (
  //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh'}}>
  //           <Spinner color="blue" className="flex-grow" />
  //         </div>
  //       )}
  //     </div>
  //   </>

  // );
}
 
export default Grants;