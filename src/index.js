import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';

const TRACKING_ID = "UA-159290967-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
