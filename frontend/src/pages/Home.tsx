<<<<<<< HEAD
import { HomePageSidebar } from "../components/Sidebar";
import BasicGrid from "../components/BasicGrid";
import UpdatedGrid from "../components/UpdatedGrid";




const HomePage = () => {
    return ( 
        <>
            <div className="flex flex-row">
                <HomePageSidebar />
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between items-center p-4">
                        
                        
                        <UpdatedGrid />
                        
                    </div>

                </div>
            </div>
        </>
=======
import { HomePageSidebar } from '../components/Sidebar';
import BasicGrid from '../components/BasicGrid';
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
            <BasicGrid />
          </div>
        </div>
      </div>
    </>
>>>>>>> 41c695baba36b63b83fbbc3e5a89b7b67d12db8f
        

  );
}
 
export default HomePage;