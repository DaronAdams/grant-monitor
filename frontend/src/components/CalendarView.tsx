// calendar component to display start date/month of a grant
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { HomePageSidebar } from './Sidebar';
import axios from 'axios';
import { grantListEndpoint } from '../constants/endpoints';


const [data, setData] = useState({startDate:null, endDate:null});
const [isLoading, setIsLoading] = useState(true);

// get grant data from db
useEffect(() => {
  axios.get(grantListEndpoint)
    .then(response => {
      console.log('Response', response.data.grants);
      setData(response.data.grants);
      setIsLoading(false);
    })
}, []);

export function calendarStart() {
  const startDate= data.startDate;
  return(
    <>
      <div>
        <Calendar
          value={startDate} />
      </div>
    </>
  );
}

export function calendarEnd() {
  const endDate= data.endDate;
  return(
    <>
      <div>
        <Calendar
          value={endDate} />
      </div>
    </>
  )
}
