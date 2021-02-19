import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import { Button, TextField, FormLabel } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { newInspections } from 'actions';
import useRouter from 'utils/useRouter';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {},
  fields: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1),
      width: '100%'
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const schema = (newStartDate) => {
  return {
    title: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 80
      }
    },
    start_date: {
      presence: { allowEmpty: false, message: 'is required' },
      datetime: {
        dateOnly: true,
        earliest: moment.utc().subtract(1, 'days'),
        message: '^You need to add a future date'
      }
    },
    end_date: {
      presence: { allowEmpty: false, message: 'is required' },
      datetime: {
        dateOnly: true,
        earliest: newStartDate,
        message: '^You need to add a date equal to or greater than Start Date'
      }
    }
  };
};

const Form = (props) => {
  const { className, ...rest } = props;

  const { history } = useRouter();
  const dispatch = useDispatch();

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    validate.extend(validate.validators.datetime, {
      parse: function (value) {
        return +moment.utc(value);
      },
      format: function (value, options) {
        var format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
        return moment.utc(value).format(format);
      }
    });

    const errors = validate(
      formState.values,
      schema(formState.values.start_date)
    );

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(newInspections(formState, history));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : undefined;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <FormLabel>Title</FormLabel>
        <TextField
          error={hasError('title')}
          helperText={hasError('title') ? formState.errors.title[0] : null}
          label="Title"
          name="title"
          onChange={handleChange}
          value={formState.values.title || ''}
          variant="outlined"
        />
        <FormLabel>Start Date</FormLabel>
        <TextField
          error={hasError('start_date')}
          helperText={
            hasError('start_date') ? formState.errors.start_date[0] : null
          }
          name="start_date"
          onChange={handleChange}
          type="date"
          value={formState.values.start_date || ''}
          variant="outlined"
        />
        <FormLabel>End Date</FormLabel>
        <TextField
          error={hasError('end_date')}
          helperText={
            hasError('end_date') ? formState.errors.end_date[0] : null
          }
          name="end_date"
          onChange={handleChange}
          type="date"
          value={formState.values.end_date || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Create inspection
      </Button>
    </form>
  );
};

Form.propTypes = {
  className: PropTypes.string
};


export default Form;
