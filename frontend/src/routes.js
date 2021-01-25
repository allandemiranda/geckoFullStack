import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import DashboardLayout from './layouts/Dashboard';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/calendar" />
  },  
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/calendar',
        exact: true,
        component: lazy(()=> import('./views/CalendarApp'))
      },
      {
        path: '/data',
        exact: true,
        component: lazy(()=> import('./views/Data'))
      },
      {
        component: () => <Redirect to="/calendar" />
      }
    ]
  }
];

export default routes;