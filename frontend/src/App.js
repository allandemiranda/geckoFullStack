import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { Provider as StoreProvider } from 'react-redux';
import { configureStore } from './store';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
import routes from './routes';

const history = createBrowserHistory();
const store = configureStore();

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>{renderRoutes(routes)}</Router>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
