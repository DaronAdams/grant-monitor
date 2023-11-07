import CalendarView from '../../CalendarView';
import GrantData from '../../../interfaces/GrantData';


interface GrantMainTabProps {
  grantData: GrantData;
}

const Visuals:React.FC<GrantMainTabProps> = ({grantData}) => {

  return(
    <><div>
      Visuals tab content
    </div>
    <div className="flex flex-row">

      <div>
      Grant Start Date
        <CalendarView displayDate={grantData.startDate} />
      </div>

      <div className="px-4">
      Today's Date
        <CalendarView displayDate={new Date()} />
      </div>

      <div>
      Grant End Date
        <CalendarView displayDate={grantData.endDate} />
      </div>

    </div>
    
    </>
  ) 
} 
export default Visuals;