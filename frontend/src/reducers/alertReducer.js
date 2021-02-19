import * as actionTypes from 'actions';

const initialState = {
  message: '',
  variant: 'default',
  open: false
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALERT_ON: {
      return {
        ...state,
        message: action.message,
        variant: action.variant,
        open: true
      };
    }

    case actionTypes.ALERT_OFF: {
      return {
        ...state,
        open: false
      };
    }

    default: {
      return state;
    }
  }
};

export default alertReducer;
