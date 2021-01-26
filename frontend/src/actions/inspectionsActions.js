import axios from 'utils/axios';
import { newAlert } from 'actions';

export const newInspections = (payload, router) => {
  return async (dispatch) => {
    const body = {
      title: payload.values.title,
      start_date: payload.values.start_date,
      end_date: payload.values.end_date
    };

    const response = await axios
      .post('/inspections/', body)
      .catch(async () => dispatch(await errorNewInspections()));

    if (response) {
      return dispatch(await successNewInspections(body.title, router));
    }
  };
};

export const errorNewInspections = async () => {
  return async (dispatch) => {
    const alert = {
      message: 'Error to creat inspections event!',
      variant: 'error'
    };
    await dispatch(newAlert(alert));
  };
};

export const successNewInspections = async (title, router) => {
  return async (dispatch) => {
    const alert = {
      message: title + ' successfully created!',
      variant: 'success'
    };
    await dispatch(newAlert(alert));
    router.push('/calendar');
  };
};
