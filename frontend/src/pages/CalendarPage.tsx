import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { HomePageSidebar } from '../components/Sidebar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage = () => {
  const [value, onChange] = useState<Value>(new Date());

  return(
    <>
      <div className="flex flex-row">
        <HomePageSidebar />
        <div className="flex flex-grow">
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </>
  )
}

export default CalendarPage;
