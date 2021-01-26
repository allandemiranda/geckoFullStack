import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Header, Page } from 'components';
import axios from 'utils/axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Alert } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAlert } from 'actions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  alert:{
    marginBottom: '1%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const CalendarApp = () => {
  const classes = useStyles();
  const localizer = momentLocalizer(moment);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const [myEventsList, setMyEventsList] = useState([]);
  const [newAlert, setNewAlert] = useState(false);  
  const [alertBanner, setAlertBanner] = useState(false);
  const [event, setEvent] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);    
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (alert.open) {
      setAlertBanner(true);
      dispatch(deleteAlert());
      setTimeout(function () {
        setAlertBanner(false);
      }, 4000);
    }
  }, [alert]);

  useEffect(() => {
    let mounted = true;

    const fetchMyEventsList = async () => {
      const response_inspections = axios
        .get('/inspections/?format=json')
        .catch(() => {
          setNewAlert(true);
          return {data:[]}
        });
      const response_maintenance = axios
        .get('/maintenance/?format=json')        
        .catch(() => {
          setNewAlert(true);
          return {data:[]}
        });
      Promise.all([response_inspections,response_maintenance]).then((response) => {
        if (mounted) {   
          const list = [...response[0].data, ...response[1].data];
          const new_list = list.map((value)=>{
            value.start_date = moment(value.start_date).add('1', 'seconds')
            value.end_date = moment(value.end_date).add('1', 'seconds')
            return value
          }) 
          setMyEventsList(new_list)
        }
      });
    };

    fetchMyEventsList();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Page
      title="Calendar"
    >
      <Header title={'Calendar'} />
      {newAlert && (
        <Alert
          className={classes.alert}
          severity="error"
        >Error getting information from server!</Alert>
      )}
      {alertBanner && 
      <Alert
        className={classes.alert}
        severity={alert.variant}
      >{alert.message}</Alert>}
      {myEventsList.length > 0 && (
        <Calendar
          endAccessor="end_date"
          events={myEventsList}
          localizer={localizer}
          onSelectEvent={(event)=>{Promise.all([setEvent(event), handleOpen()])}}
          startAccessor="start_date"
          style={{ height: 500 }}
        />
      )}
      <br />
      <div className={classes.root}>
        <Button
          color="primary"
          href={'/inspection/add'}
          variant="contained"
        >
        New Inspection
        </Button>
        <Button
          color="primary"
          href={'/maintenance/add'}
          variant="contained"
        >
        New Maintenance
        </Button>
        <Button
          color="secondary"
          href={'/data'}
          variant="contained"
        >
        Data
        </Button>
      </div>
      <Modal
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-describedby="transition-modal-description"
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        closeAfterTransition
        onClose={handleClose}
        open={open}
      >
        <Fade in={open}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                component="h2"
                gutterBottom
                variant="h5"
              >
                {event.title}
              </Typography>
              {event.start_date && 
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Start {event.start_date._i}
              </Typography>}
              {event.end_date && 
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                End {event.end_date._i}
              </Typography>  }            
              {event.description && 
              <Typography
                component="p"
                variant="body2"
              >
                {event.description}
              </Typography>}
            </CardContent>
          </Card>
        </Fade>
      </Modal>
      
    </Page>
  );
};

export default CalendarApp;
