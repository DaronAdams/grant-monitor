import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { HomePageSidebar } from '../components/Sidebar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarPage = () => {
  // Get the current date
  const currentDate = new Date();

  // Create an array to store dates for the next 6 months, including the current month
  const monthsArray = Array.from({ length: 6 }, (_, index) => {
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(currentDate.getMonth() + index);
    return nextMonthDate;
  });

  return (
    <>
      <div className="flex flex-row">
        <HomePageSidebar />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '10px',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          {monthsArray.map((month, index) => (
            <div key={index}>
              <Calendar
                value={month}
                showDoubleView={false}
                showFixedNumberOfWeeks={true}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
