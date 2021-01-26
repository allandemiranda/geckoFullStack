import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CardContent, Card } from '@material-ui/core';
import { Form } from './components';
import { Header, Page } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAlert } from 'actions';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {},
  registerForm: {
    marginTop: theme.spacing(1)
  },
  alert:{
    marginBottom: '1%'
  }
}));

const NewInspections = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const [alertBanner, setAlertBanner] = useState(false);

  useEffect(() => {
    if (alert.open) {
      setAlertBanner(true);      
      setTimeout(function () {
        setAlertBanner(false);
        dispatch(deleteAlert());
      }, 4000);
    }
  }, [alert]);

  return (
    <Page
      title="Add Inspections"
    >
      <Header title="Add Inspections" />
      {alertBanner && 
      <Alert
        className={classes.alert}
        severity={alert.variant}
      >{alert.message}</Alert>}
      <Card>
        <CardContent>
          <Form className={classes.registerForm} />
        </CardContent>
      </Card>
    </Page>
  );
};

export default NewInspections;
