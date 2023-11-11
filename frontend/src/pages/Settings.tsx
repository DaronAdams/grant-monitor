import NavSpeedDial from '../components/NavSpeedDial'
import { ChangePassword } from '../components/ChangePassword';


const HomePage = () => {

  return ( 
    <>
      <div className="flex flex-row h-20">
        <NavSpeedDial />
      </div>
      
      <div className="flex items-center justify-center">
        <ChangePassword />
      </div>
    </>

  );
}
 
export default HomePage;