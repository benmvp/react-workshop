import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  addEmail,
  getEmails,
  deleteEmail,
  markRead,
  markUnread
} from './action-reducers';

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

const EmailFormWrapper = ({showForm, onSubmit, onCancel}) => {
  let component = null;

  if (showForm) {
    component = (
      <div className="app__form-modal">
        <div className="app__form">
          <EmailForm onSubmit={onSubmit} onCancel={onCancel} />
        </div>
      </div>
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
    selectedEmailId: -1,
    // Initialize show form flag to false, indicating that it won't show.
    // When the new email button is clicked, it'll be set to `true`. It'll
    // be toggled false on form submission or cancel
    showForm: false
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

  _getUpdateEmails = () => {
    return getEmails().then(emails => this.setState({emails}));
  }

  _handleItemSelect = (selectedEmailId) => {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId}, () => {
      // also mark the email as read
      this._handleItemMarkRead(selectedEmailId);
    });
  }

  _handleItemSelect = (selectedEmailId) => {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId});
  }

  _handleEmailViewClose = () => {
    // We close the email view by resetting the selected email
    this.setState({selectedEmailId: -1});
  }

  _handleFormSubmit = (newEmail) => {
    addEmail(this.state.emails, newEmail)
      // if the email was successfully updated, we have to make
      // a request to get the new list of emails, but we'll have
      // to wait for the response of that request, so let's add to
      // our state immediately and then later when the response
      // comes back, the server-side list will update. This is mainly
      // here to demonstrate immutable updating of data structures
      .then(emails => this.setState({emails, showForm: false}));
  }

  _handleItemDelete = (emailId) => {
    deleteEmail(this.state.emails, emailId)
      // optimistic updating (see _handleFormSubmit for more info)
      // Also reset `selectedEmailId` since we're deleting it
      .then(emails => this.setState({emails, selectedEmailId: -1}));
  }

  _handleItemMarkUnread = (emailId) => {
    markUnread(this.state.emails, emailId)
      // optimistic updating (see _handleFormSubmit for more info)
      .then(emails => this.setState({emails}));
  }

  _handleItemMarkRead = (emailId) => {
    markRead(this.state.emails, emailId)
      // optimistic updating (see _handleFormSubmit for more info)
      .then(emails => this.setState({emails}));
  }

  _handleShowForm = () => {
    // Show email form overlay by setting state to true
    this.setState({showForm: true});
  }

  _handleHideForm = () => {
    // Hide email form overlay by setting state to false
    this.setState({showForm: false});
  }

  render() {
    let {emails, selectedEmailId, showForm} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);

    return (
      <main className="app">
        <div className="app__page">
          <div className="app__list">
            <EmailList
              emails={emails}
              onItemSelect={this._handleItemSelect}
              onItemDelete={this._handleItemDelete}
              onItemMarkUnread={this._handleItemMarkUnread}
              selectedEmailId={selectedEmailId}
            />
          </div>
          <EmailViewWrapper
            selectedEmail={selectedEmail}
            onClose={this._handleEmailViewClose}
            onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
            onMarkUnread={this._handleItemMarkUnread.bind(this, selectedEmailId)}
            onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
          />
          <button
            className="app__new-email"
            onClick={this._handleShowForm}
          >
            +
          </button>
          <EmailFormWrapper
            showForm={showForm}
            onSubmit={this._handleFormSubmit}
            onCancel={this._handleHideForm}
          />
        </div>
      </main>
    );
  }
}
