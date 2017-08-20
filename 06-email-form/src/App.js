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
    emails: [],
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
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

  _handleItemSelect(selectedEmailId) {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId});
  }

  _handleEmailViewClose() {
    // We close the email view by resetting the selected email
    this.setState({selectedEmailId: -1});
  }

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView
          email={selectedEmail}
          onClose={this._handleEmailViewClose.bind(this)}
        />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={emails}
          onItemSelect={this._handleItemSelect.bind(this)}
        />
        {emailViewComponent}
        <EmailForm />
      </main>
    );
  }
}
