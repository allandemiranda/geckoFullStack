import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Header } from './components';
import './Dashboard.css';

const Dashboard = (props) => {
  const { route } = props;

  return (
    <div className={'body'}>
      <Header/>
      <main>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;
