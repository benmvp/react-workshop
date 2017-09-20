import React, {PureComponent} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';

import {getEmails} from './actions';
import {emails} from './reducers';

export default class App extends PureComponent {
  static propTypes = {
    pollInterval: PropTypes.number
  };

  static defaultProps = {
    // default the `pollInterval` prop to 2 secs when not specified
    pollInterval: 2000
  };


  constructor(props) {
    super(props);

    this._store = createStore(
      emails,
      applyMiddleware(thunk)
    );
  }

  componentDidMount() {
    // Retrieve emails from server once we know DOM exists
    this._getUpdateEmails();

    // Set up long-polling to continuously get new data
    this._pollId = setInterval(
      () => this._getUpdateEmails(),
      this.props.pollInterval
    );
  }

  componentWillUnmount() {
    // Need to remember to clearInterval when the component gets
    // removed from the DOM, otherwise the interval will keep going
    // forever and leak memory
    clearInterval(this._pollId);
  }

  _getUpdateEmails() {
    this._store.dispatch(getEmails());
  }

  render() {
    let {pollInterval} = this.props;

    return (
      <Provider store={this._store}>
        <Page pollInterval={pollInterval} />
      </Provider>
    );
  }
}
