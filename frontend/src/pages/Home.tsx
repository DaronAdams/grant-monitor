import { HomePageSidebar } from '../components/Sidebar';
import BasicGrid from '../components/BasicGrid';

const HomePage = () => {
  return ( 
    <>
      <div className="flex flex-row">
        <HomePageSidebar />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center p-4">
                        
            <BasicGrid />
          </div>
        </div>
      </div>
    </>
        

  );
}
 
export default HomePage;