import React from 'react';

import {addEmail, deleteEmail, getEmails, markRead, markUnread} from '../action-reducers';

import EmailForm from '../components/EmailForm';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';

import './App.scss';

export default class App extends React.Component {
    static propTypes = {
        pollInterval: React.PropTypes.number
    }

    static defaultProps = {
        pollInterval: 2000
    }

    state = {
        emails: [],
        selectedEmailId: -1
    }

    componentDidMount() {
        this._getUpdateEmails();

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
        return getEmails()
            .then((emails) => this.setState({emails}));
    }

    _handleItemSelect(emailId) {
        if (this.state.selectedEmailId !== emailId) {
            // update state (so that the EmailView will show)
            this.setState({selectedEmailId: emailId});

            // also mark the email as read
            markRead(this.state.emails, emailId)
                // optimistic updating (see _handleFormSubmit for more info)
                .then((emails) => this.setState({emails}))

                // actually retrieve new emails from server
                .then(() => this._getUpdateEmails());
        }
    }

    _handleItemDelete(emailId) {
        deleteEmail(this.state.emails, emailId)
            // optimistic updating (see _handleFormSubmit for more info)
            .then((emails) => this.setState({emails}))

            // actually retrieve new emails from server
            .then(() => this._getUpdateEmails());
    }

    _handleItemMarkUnread(emailId) {
        markUnread(this.state.emails, emailId)
            // optimistic updating (see _handleFormSubmit for more info)
            .then((emails) => this.setState({emails}))

            // actually retrieve new emails from server
            .then(() => this._getUpdateEmails());
    }

    _handleEmailViewClose() {
        // We close the email view by resetting the selected email
        this.setState({
            selectedEmailId: -1
        });
    }

    _handleFormSubmit(newEmail) {
        addEmail(this.state.emails, newEmail)
            // if the email was successfully updated, we have to make
            // a request to get the new list of emails, but we'll have
            // to wait for the response of that request, so let's add to
            // our state immediately and then later when the response
            // comes back, the server-side list will update. This is mainly
            // here to demonstrate immutable updating of data structures
            .then((emails) => this.setState({emails}))

            // actually retrieve new emails from server
            .then(() => this._getUpdateEmails());
    }

    render() {
        let {emails, selectedEmailId} = this.state;
        let selectedEmail = emails.find((email) => email.id === selectedEmailId);
        let emailView;

        if (selectedEmail) {
            emailView = (
                <article className="app_view">
                    <EmailView email={selectedEmail}
                        onClose={this._handleEmailViewClose.bind(this)}
                    />
                </article>
            );
        }

        return (
            <div className="app">
                <div className="app__page">
                    <section className="app__list">
                        <EmailList emails={emails}
                            selectedEmailId={selectedEmailId}
                            onItemSelect={this._handleItemSelect.bind(this)}
                            onItemDelete={this._handleItemDelete.bind(this)}
                            onItemMarkUnread={this._handleItemMarkUnread.bind(this)}
                        />
                    </section>

                    {emailView}

                    <aside className="app__form">
                        <EmailForm onSubmit={this._handleFormSubmit.bind(this)} />
                    </aside>
                </div>
            </div>
        );
    }
}
