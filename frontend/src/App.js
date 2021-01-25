import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import logo from './logo.png';

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import axios from './utils/axios';
import { useEffect, useState } from 'react';

function App() {
  const localizer = momentLocalizer(moment)

  const [myEventsList, setMyEventsList] = useState([])

  useEffect(()=>{
    let mounted = true;

    const fetchMyEventsList = () => {
      axios.get('/inspections/?format=json').then(response => {
        if (mounted) {          
          setMyEventsList(response.data)
        }
      }).catch((err)=>{
        console.log(err)
      });
    }

    fetchMyEventsList();

    return () => {
      mounted = false;
    };
    
  },[]);

  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Gecko Portal</h1>
      </header>
      <div>
        <h2>Calendar</h2>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start_date"
          endAccessor="end_date"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
}

export default App;
