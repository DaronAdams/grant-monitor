import { HomePageSidebar } from '../components/Sidebar';
import { useAuth } from '../hooks/context/authContext';
import { TabsDefault } from '../components/Tabs';

const GrantShowPage = () => {
  const { user } = useAuth();

  return ( 
    <>
      <div className="flex flex-row">
        <HomePageSidebar />
        <div className="flex flex-col">
          <TabsDefault />

        </div>
      </div>
    </>
        

  );
}
 
export default GrantShowPage;