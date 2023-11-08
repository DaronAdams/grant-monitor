// calendar component to display start date/month of a grant
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarDateProps {
  displayDate: Date;
}

const CalendarView:React.FC<CalendarDateProps> = ({displayDate}) => {
  
  return(
    <>
      <div>
        <Calendar
          value={displayDate}
          showFixedNumberOfWeeks={true} />
      </div>
    </>
  )
} 
export default CalendarView;

//notes
// value passes through to calendar what should be the starting display date
// showFixedNumberOfWeeks defaults to 6 weeks, and is set to True so our formatting/layout is consistent