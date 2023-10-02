import { HomePageSidebar } from "../components/Sidebar";
import BasicBar from "../components/BasicBarChart";

const TestBar = () => {
    return ( 
        <>
            <div className="flex flex-row">
                <HomePageSidebar />
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between items-center p-4">
                        
                        <BasicBar />
                    </div>
                </div>
            </div>
        </>
        
     );
}
 
export default TestBar;


