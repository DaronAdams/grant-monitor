import NavSpeedDial from '../components/NavSpeedDial'
import { ChangePassword } from '../components/ChangePassword';


const HomePage = () => {
  //const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  /*
  useEffect(() => {
    axios
      .get(grantListEndpoint)
      .then((response) => {
        console.log('Response', response.data.grants);
        setAllGrantsData(response.data.grants);
        setIsLoading(false);
      })
  }, []);
  const openSubpage = (grantData: GrantData) => {
    setGrantData(grantData);
  }

  const closeSubpage = () => {
    setGrantData(null);
  }

  */


  return ( 
    <>
      <div className="flex flex-row h-20">
        <NavSpeedDial />
        
      </div>
    </>

  );
}
 
export default HomePage;