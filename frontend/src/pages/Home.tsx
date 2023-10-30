import { HomePageSidebar } from '../components/Sidebar';
import UpdatedGrid from '../components/UpdatedGrid';
import { useAuth } from '../hooks/context/authContext';

const HomePage = () => {
  const { user } = useAuth();

  return ( 
    <>
      <div className="flex flex-row">
        <HomePageSidebar />
        <div className="flex flex-col w-full">
          { user ? (<p>Welcome {user.email} </p>) : (<p>Welcome Guest</p>)}
          <div className="flex flex-row justify-between items-center p-4">
            <UpdatedGrid />
          </div>
        </div>
      </div>
    </>

  );
}
 
export default HomePage;