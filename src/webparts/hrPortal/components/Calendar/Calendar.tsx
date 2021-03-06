import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
 
function Calendar_design() {

  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value} 
      />
      </div>
    );
  }
  export default Calendar_design;