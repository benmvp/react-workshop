import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import Page from './containers/Page';

import {emails} from './reducers';

const store = createStore(
  emails,
  applyMiddleware(thunk)
);

export default class App extends PureComponent {
  static propTypes = {
    pollInterval: PropTypes.number
  };

  static defaultProps = {
    // default the `pollInterval` prop to 2 secs when not specified
    pollInterval: 2000
  };

  render() {
    let {pollInterval} = this.props;

    return (
      <Provider store={store}>
        <Page pollInterval={pollInterval} />
      </Provider>
    );
  }
}
