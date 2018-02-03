import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';

import './App.css';

const EmailViewWrapper = ({
  selectedEmail,
  onClose,
  onDelete,
  onMarkUnread,
  onMarkRead
}) => {
  let component = null;

  if (selectedEmail) {
    component = (
      <article className="app__view">
        <EmailView
          email={selectedEmail}
          onClose={onClose}
          onDelete={onDelete}
          onMarkUnread={onMarkUnread}
          onMarkRead={onMarkRead}
        />
      </article>
    );
  }

  return component;
};

export default class App extends Component {
  static propTypes = {
    pollInterval: PropTypes.number
  }

  static defaultProps = {
    // default the `pollInterval` prop to 2 secs when not specified
    pollInterval: 2000
  }

  state = {
    // Initialize emails state to an empty array.
    // Will get populated with data in `componentDidMount`
    emails: [],
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  }

  componentDidUpdate() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);    

    // mark the email as read if it is currently unread
    if (selectedEmail && selectedEmail.unread) {
      this._setUnread(selectedEmailId, false);
    }
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
    return fetch('//localhost:9090/emails')
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

  _handleFormSubmit(newEmail) {
    // Make a JSON POST with the new email
    fetch('//localhost:9090/emails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmail)
    })
      .then(res => res.json())
      .then(({success}) => {
        if (success) {
          this.setState(({emails}) => {
            // if the email was successfully updated, we have to make
            // a request to get the new list of emails, but we'll have
            // to wait for the response of that request, so let's add to
            // our state immediately and then later when the response
            // comes back, the server-side list will update. This is mainly
            // here to demonstrate immutable updating of data structures

            // Create a full email info by spreading in `id`, `date` & `unread`
            // Then spread to front of emails state (since it's the newest)
            let newEmails = [
              {
                ...newEmail,
                id: Date.now(),
                date: `${new Date()}`,
                unread: true
              },
              ...emails
            ];

            // Set state with new updated emails list
            return {emails: newEmails};
          });
        } else {
          throw new Error('Unable to send email!');
        }
      })
      .catch(ex => console.error(ex));
  }

  _handleItemDelete(emailId) {
    // Make a DELETE request
    fetch(`//localhost:9090/emails/${emailId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      // optimistic updating (see _handleFormSubmit for more info)
      .then(({success}) => {
        if (success) {
          this.setState(({emails}) => ({
            // "delete" the email by returning a filtered list that doesn't include it
            emails: emails.filter(email => email.id !== emailId),

            // Also reset `selectedEmailId` since we're deleting it
            selectedEmailId: -1
          }));
        } else {
          throw new Error(`Unable to delete email ID# ${emailId}.`);
        }
      })
      .catch(ex => console.error(ex));
  }

  _setUnread(emailId, unread = true) {
    // Make a PUT request to update unread state
    fetch(`//localhost:9090/emails/${emailId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({unread})
    })
      .then(res => res.json())
      // optimistic updating (see _handleFormSubmit for more info)
      .then(({success}) => {
        if (success) {
          this.setState(({emails}) => {
            // Map over all of the emails and when we find the match
            // override its `unread` property with the new value by
            // doing object spread
            let newEmails = emails.map(
              email => (email.id === emailId ? {...email, unread} : email)
            );

            return {emails: newEmails};
          });
        } else {
          throw new Error(
            `Unable to set email ID# ${emailId} unread state to ${unread}.`
          );
        }
      })
      .catch(ex => console.error(ex));
  }

  _handleItemMarkUnread(emailId) {
    this._setUnread(emailId);
  }

  _handleItemMarkRead(emailId) {
    this._setUnread(emailId, false);
  }

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);

    return (
      <main className="app">
        <div className="app__page">
          <div className="app__list">
            <EmailList
              emails={emails}
              onItemSelect={this._handleItemSelect.bind(this)}
              onItemDelete={this._handleItemDelete.bind(this)}
              onItemMarkUnread={this._handleItemMarkUnread.bind(this)}
              selectedEmailId={selectedEmailId}
            />
          </div>
          <EmailViewWrapper
            selectedEmail={selectedEmail}
            onClose={this._handleEmailViewClose.bind(this)}
            onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
            onMarkUnread={this._handleItemMarkUnread.bind(
              this,
              selectedEmailId
            )}
            onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
          />
          <div className="app__form">
            <EmailForm onSubmit={this._handleFormSubmit.bind(this)} />
          </div>
        </div>
      </main>
    );
  }
}
