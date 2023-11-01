import { HomePageSidebar } from '../components/Sidebar';
import UpdatedGrid from '../components/UpdatedGrid';
import Subpage from '../components/Subpage';
import { useAuth } from '../hooks/context/authContext';
import { useState } from 'react';
import GrantShow from './GrantShow';


const HomePage = () => {
  const { user } = useAuth();
  const [grantShowParams, setGrantShowParams] = useState<any | null>(null);


  const openSubpage = (params: any) => {
    setGrantShowParams(params);
  };

  return ( 
    <>
      <div className="flex flex-row">
        <HomePageSidebar />
        
        {grantShowParams !== null && (
          <Subpage>
            <GrantShow params={grantShowParams} /> // Pass the id to the subcomponent within Subpage
          </Subpage>
        ) || 
        (
          <Subpage>
            { user ? (<p>Welcome {user.email} </p>) : (<p>Welcome Guest</p>)}
            <div className="flex flex-row justify-between items-center p-4">
              <UpdatedGrid openSubpage={openSubpage} />
            </div>
          </Subpage>
        )}
      </div>
    </>

  );
}
 
export default HomePage;