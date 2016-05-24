import React from 'react';
import ReactDOM from 'react-dom';

import EmailApp from './containers/App.js';

ReactDOM.render(
    <EmailApp pollInterval={5000} />,
    document.getElementById('app')
);
