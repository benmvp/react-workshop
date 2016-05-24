import React from 'react';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';

import * as actionReducers from '../action-reducers';

import EmailForm from '../components/EmailForm';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';

import './App.scss';

const EmailViewWrapper = ({selectedEmail, onClose, onDelete, onMarkUnread, onMarkRead}) => {
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

export default class App extends React.Component {
    static propTypes = {
        pollInterval: React.PropTypes.number
    }

    static defaultProps = {
        pollInterval: 2000
    }

    state = {
        emails: [],
        selectedEmailId: -1,
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

    _getUpdateEmails() {
        return actionReducers.getEmails()
            .then((emails) => {
                // Because `emails` is a different reference from `this.state.emails`,
                // the component will unnecessarily re-render even though the contents
                // are the same. The virtual DOM will prevent the actual DOM from updating
                // but it still actually has to run its diffing algorithm. So instead
                // making this quick check here, saves unnecessary extra work
                if (!isEqual(emails, this.state.emails)) {
                    this.setState({emails});
                }
            });
    }

    _handleItemSelect(emailId) {
        // update state (so that the EmailView will show)
        this.setState({selectedEmailId: emailId});

        if (this.state.selectedEmailId !== emailId) {
            // also mark the email as read
            actionReducers.markRead(this.state.emails, emailId)
                // optimistic updating (see _handleFormSubmit for more info)
                .then((emails) => this.setState({emails}));
        }
    }

    _handleEmailViewClose() {
        // We close the email view by resetting the selected email
        this.setState({selectedEmailId: -1});
    }

    _handleFormSubmit(newEmail) {
        actionReducers.addEmail(this.state.emails, newEmail)
            // if the email was successfully updated, we have to make
            // a request to get the new list of emails, but we'll have
            // to wait for the response of that request, so let's add to
            // our state immediately and then later when the response
            // comes back, the server-side list will update. This is mainly
            // here to demonstrate immutable updating of data structures
            .then((emails) => this.setState({emails, showForm: false}));
    }

    _handleItemDelete(emailId) {
        actionReducers.deleteEmail(this.state.emails, emailId)
            // optimistic updating (see _handleFormSubmit for more info)
            // Also reset `selectedEmailId` since we're deleting it
            .then((emails) => this.setState({emails, selectedEmailId: -1}));
    }

    _handleItemMarkUnread(emailId) {
        actionReducers.markUnread(this.state.emails, emailId)
            // optimistic updating (see _handleFormSubmit for more info)
            .then((emails) => this.setState({emails}));
    }

    _handleItemMarkRead(emailId) {
        actionReducers.markRead(this.state.emails, emailId)
            // optimistic updating (see _handleFormSubmit for more info)
            .then((emails) => this.setState({emails}));
    }

    _handleShowForm() {
        // Show email form overlay by setting state to true
        this.setState({showForm: true});
    }

    _handleHideForm() {
        // Hide email form overlay by setting state to false
        this.setState({showForm: false});
    }

    render() {
        let {emails, selectedEmailId, showForm} = this.state;
        let selectedEmail = find(emails, (email) => email.id === selectedEmailId);

        return (
            <main className="app">
                <div className="app__page">
                    <section className="app__list">
                        <EmailList emails={emails}
                            selectedEmailId={selectedEmailId}
                            onItemSelect={this._handleItemSelect.bind(this)}
                            onItemDelete={this._handleItemDelete.bind(this)}
                            onItemMarkUnread={this._handleItemMarkUnread.bind(this)}
                        />
                    </section>
                    <EmailViewWrapper selectedEmail={selectedEmail}
                        onClose={this._handleEmailViewClose.bind(this)}
                        onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
                        onMarkUnread={this._handleItemMarkUnread.bind(this, selectedEmailId)}
                        onMarkRead={this._handleItemMarkRead.bind(this, selectedEmailId)}
                    />
                    <button className="app__new-email" onClick={this._handleShowForm.bind(this)}>+</button>
                    <EmailFormWrapper showForm={showForm}
                        onSubmit={this._handleFormSubmit.bind(this)}
                        onCancel={this._handleHideForm.bind(this)}
                    />
                </div>
            </main>
        );
    }
}
