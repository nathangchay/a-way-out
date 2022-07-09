import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import 'rmwc/dist/styles';

import App from './components/App';
import ReduxStore from './components/model/ReduxStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={ReduxStore}>
    <App />
  </Provider>,
);
