import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import ConnectedPage from './containers/ConnectedPage';

import {emails} from './reducers';

const store = createStore(emails, applyMiddleware(thunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedPage pollInterval={5000} />
      </Provider>
    );
  }
}
