import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import EmailForm from '../components/EmailForm';
import {EMAIL_PROP_TYPE} from '../components/constants';

import {
  getEmails as getEmailsAction,
  addEmail as addEmailAction,
  deleteEmail as deleteEmailAction,
  markRead as markReadAction,
  markUnread as markUnreadAction
} from '../actions';

import './Page.css';

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
      <article className="page__view">
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
      <div className="page__form-modal">
        <div className="page__form">
          <EmailForm onSubmit={onSubmit} onCancel={onCancel} />
        </div>
      </div>
    );
  }

  return component;
};

class Page extends Component {
  static propTypes = {
    pollInterval: PropTypes.number,
    emails: PropTypes.arrayOf(EMAIL_PROP_TYPE),
    addEmail: PropTypes.func,
    getEmails: PropTypes.func,
    deleteEmail: PropTypes.func,
    markRead: PropTypes.func,
    markUnread: PropTypes.func
  };

  static defaultProps = {
    // default the `pollInterval` prop to 2 secs when not specified
    pollInterval: 2000
  };

  state = {
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1,
    // Initialize show form flag to false, indicating that it won't show.
    // When the new email button is clicked, it'll be set to `true`. It'll
    // be toggled false on form submission or cancel
    showForm: false
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

  _getUpdateEmails = () => {
    this.props.getEmails();
  }

  _handleItemSelect = (selectedEmailId) => {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId});

    if (this.state.selectedEmailId !== selectedEmailId) {
      // also mark the email as read
      this.props.markRead(selectedEmailId);
    }
  }

  _handleEmailViewClose = () => {
    // We close the email view by resetting the selected email
    this.setState({selectedEmailId: -1});
  }

  _handleFormSubmit = (newEmail) => {
    this.props.addEmail(newEmail);
    //the optimistic update is now happening
    //automatically thanks to attaching our state
    //to our redux store
    this.setState({showForm: false});
  }

  _handleItemDelete = (emailId) => {
    this.props.deleteEmail(emailId);
    //reset `selectedEmailId` since we're deleting it
    this.setState({selectedEmailId: -1});
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
    let {emails, markUnread, markRead} = this.props;
    let {selectedEmailId, showForm} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);

    return (
      <main className="page">
        <div className="page__page">
          <div className="page__list">
            <EmailList
              emails={emails}
              onItemSelect={this._handleItemSelect.bind(this)}
              onItemDelete={this._handleItemDelete.bind(this)}
              onItemMarkUnread={markUnread}
              selectedEmailId={selectedEmailId}
            />
          </div>
          <EmailViewWrapper
            selectedEmail={selectedEmail}
            onClose={this._handleEmailViewClose.bind(this)}
            onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
            onMarkUnread={markUnread.bind(null, selectedEmailId)}
            onMarkRead={markRead.bind(null, selectedEmailId)}
          />
          <button
            className="page__new-email"
            onClick={this._handleShowForm.bind(this)}
          >
            +
          </button>
          <EmailFormWrapper
            showForm={showForm}
            onSubmit={this._handleFormSubmit.bind(this)}
            onCancel={this._handleHideForm.bind(this)}
          />
        </div>
      </main>
    );
  }
}

export default connect(
  //_mapStateToProps
  state => ({emails: state}),
  //_mapDispatchToProps
  {
    getEmails: getEmailsAction,
    addEmail: addEmailAction,
    deleteEmail: deleteEmailAction,
    markRead: markReadAction,
    markUnread: markUnreadAction
  }
)(Page);
