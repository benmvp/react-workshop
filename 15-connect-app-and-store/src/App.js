import React, {PureComponent} from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import Page from './containers/Page';

import {emails} from './reducers';

const store = createStore(emails, applyMiddleware(thunk));

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Page pollInterval={5000} />
      </Provider>
    );
  }
}
