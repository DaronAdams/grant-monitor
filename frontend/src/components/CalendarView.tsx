// calendar component to display start date/month of a grant
import { useState, useEffect } from 'react';
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