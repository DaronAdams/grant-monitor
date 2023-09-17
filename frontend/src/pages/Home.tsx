import { Card, Typography } from "@material-tailwind/react";
import { HomePageSidebar } from "../components/Sidebar";

const HomePage = () => {
    return ( 
        <>
            <div className="flex flex-row">
                <HomePageSidebar />
                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between items-center p-4">
                        <h1 className="text-2xl font-semibold">Dashboard</h1>
                    </div>
                </div>
            </div>
        </>
        

     );
}
 
export default HomePage;