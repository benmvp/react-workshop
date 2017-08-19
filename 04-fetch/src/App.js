import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';

export default class App extends PureComponent {
  static propTypes = {
    pollInterval: PropTypes.number
  };

  static defaultProps = {
    // default the `pollInterval` prop to 2 secs when not specified
    pollInterval: 2000
  };

  state = {
    // Initialize emails state to an empty array.
    // Will get populated with data in `componentDidMount`
    emails: []
  };

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
    return fetch('http://localhost:9090/emails')
      .then(res => res.json())
      .then(emails => this.setState({emails}))
      .catch(ex => console.error(ex));
  }

  render() {
    let {emails} = this.state;

    return (
      <main className="app">
        <EmailList emails={emails} />
        <EmailView />
        <EmailForm />
      </main>
    );
  }
}
