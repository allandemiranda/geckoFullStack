import axios from 'utils/axios';
import { newAlert } from 'actions';

export const newMaintenance = (payload, router) => {
  return async (dispatch) => {
    const body = {
      title: payload.values.title,
      description: payload.values.description,
      start_date: payload.values.start_date,
      end_date: payload.values.end_date
    };
    console.log(body)

    const response = await axios
      .post('/maintenance/', body)
      .catch(async () => dispatch(await errorNewMaintenance()));

    if (response) {
      await dispatch(await successNewMaintenance(body.title));
      return router.push('/calendar');
    }
  };
};

export const errorNewMaintenance = async () => {
  return async (dispatch) => {
    const alert = {
      message: 'Error to creat maintenance event!',
      variant: 'error'
    };
    await dispatch(newAlert(alert));
  };
};

export const successNewMaintenance = async (title) => {
  return async (dispatch) => {
    const alert = {
      message: title + ' successfully created!',
      variant: 'success'
    };
    await dispatch(newAlert(alert));    
  };
};
