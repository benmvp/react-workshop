import React from 'react';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import 'whatwg-fetch';

import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import EmailForm from '../components/EmailForm';

export default class EmailApp extends React.Component {
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
            .then((res) => res.json())
            .then((emails) => {
                // Because `emails` is a different reference from `this.state.emails`,
                // the component will unnecessarily re-render even though the contents
                // are the same. The virtual DOM will prevent the actual DOM from updating
                // but it still actually has to run its diffing algorithm. So instead
                // making this quick check here, saves unnecessary extra work
                if (!isEqual(emails, this.state.emails)) {
                    this.setState({emails});
                }
            })
            .catch((ex) => console.error(ex));
    }

    _handleItemSelect(emailId) {
        // update state (so that the EmailView will show)
        this.setState({selectedEmailId: emailId});
    }

    _handleEmailViewClose() {
        // We close the email view by resetting the selected email
        this.setState({selectedEmailId: -1});
    }

    render() {
        let {emails, selectedEmailId} = this.state;
        let selectedEmail = find(emails, (email) => email.id === selectedEmailId);
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
            <main>
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
