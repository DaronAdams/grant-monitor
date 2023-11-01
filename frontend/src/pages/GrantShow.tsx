import { useAuth } from '../hooks/context/authContext';
import { TabsDefault } from '../components/Tabs';

interface GrantShowPageProps {
  params: any;
}

const GrantShowPage:React.FC<GrantShowPageProps> = ({params}) => {
  const { user } = useAuth();

  return ( 
    <>
      <div className="flex flex-col">
        <TabsDefault />

      </div>
    </>
        

  );
}
 
export default GrantShowPage;