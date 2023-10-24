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
        

     );
}
 
export default HomePage;