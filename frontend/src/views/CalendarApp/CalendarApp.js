import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Header } from "./../../components";
import axios from "./../../utils/axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Alert } from "@material-ui/lab";

const CalendarApp = () => {
  const localizer = momentLocalizer(moment);

  const [myEventsList, setMyEventsList] = useState(null);
  const [newAlert, setNewAlert] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchMyEventsList = () => {
      axios
        .get("/inspections/?format=json")
        .then((response) => {
          if (mounted) {
            setMyEventsList(response.data);
          }
        })
        .catch((err) => {
          setNewAlert(true);
          setMyEventsList([]);
        });
    };

    fetchMyEventsList();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <Header title={"Calendar"}></Header>
      {newAlert && (
        <Alert severity="error">Error getting information from server!</Alert>
      )}
      <br></br>
      {myEventsList && (
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start_date"
          endAccessor="end_date"
          style={{ height: 500 }}
        />
      )}
    </div>
  );
};

export default CalendarApp;
