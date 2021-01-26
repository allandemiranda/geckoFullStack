/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import DashboardLayout from './layouts/Dashboard';
import ErrorLayout from './layouts/Error';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/calendar" />
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/calendar',
        exact: true,
        component: lazy(() => import('views/CalendarApp'))
      },
      {
        path: '/data',
        exact: true,
        component: lazy(() => import('views/Data'))
      },
      {
        path: '/maintenance/add',
        exact: true,
        component: lazy(() => import('views/NewMaintenances'))
      },
      {
        path: '/inspection/add',
        exact: true,
        component: lazy(() => import('views/NewInspections'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
