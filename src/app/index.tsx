import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '#styles/global.module.css';  // Global style presets

import {Provider} from 'react-redux'
import store from '#ducks/store/store';

/* DEV STYLES __REMOVE IN PRODUCTION__ */
import '#styles/dev.module.css';


/* DEV STYLES __REMOVE IN PRODUCTION__ */
import '#styles/dev.module.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
