// calendar component to display start date/month of a grant
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { HomePageSidebar } from './Sidebar';

// calling this function, passing through the grant ID as a parameter
// using that to call the startDate attribute to render the calendar

export function StartDateCal() {
// pull startDate based on grant attribute

  const startDate=new Date(2023, 1, 23); // will need to update and replace once we get DB querying set up
    
  return(
    <>
      <div>
        <Calendar
          value={startDate} />
      </div>
    </>
  );
}

export default StartDateCal;
