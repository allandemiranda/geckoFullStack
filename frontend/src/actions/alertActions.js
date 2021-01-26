export const ALERT_ON = 'ALERT_ON';
export const ALERT_OFF = 'ALERT_OFF';

export const newAlert = (payload) => {
  return async (dispatch) => {
    return dispatch({
      type: ALERT_ON,
      message: payload.message,
      variant: payload.variant
    })
  };
};

export const deleteAlert = () => {
  return async (dispatch) => {
    return dispatch({
      type: ALERT_OFF
    })
  };
};