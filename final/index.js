import App from './containers/App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <App pollInterval={5000} />,
    document.getElementById('app')
);
