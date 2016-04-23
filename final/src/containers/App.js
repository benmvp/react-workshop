import 'whatwg-fetch';
import EmailForm from '../components/EmailForm';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import React from 'react';

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
        clearInterval(this._pollId);
    }

    _getUpdateEmails() {
        fetch('/api/emails')
            .then((res) => res.json())
            .then((emails) => this.setState({emails}))
            .catch((ex) => console.error(ex));
    }

    _handleItemSelected(selectedEmailId) {
        this.setState({selectedEmailId});
    }

    _handleItemMarkedUnread(emailId) {
        console.log(emailId, 'marked unread');
    }

    _handleEmailViewClose() {
        // We close the email view by resetting the selected email
        this.setState({
            selectedEmailId: -1
        });
    }

    render() {
        let {emails, selectedEmailId} = this.state;
        let selectedEmail = emails.find((email) => email.id === selectedEmailId);
        let emailView;

        if (selectedEmail) {
            emailView = (
                <EmailView email={selectedEmail}
                    onClose={this._handleEmailViewClose.bind(this)}
                />
            );
        }

        return (
            <div>
                <EmailList emails={emails}
                    selectedEmailId={selectedEmailId}
                    onItemSelected={this._handleItemSelected.bind(this)}
                    onItemMarkedUnread={this._handleItemMarkedUnread.bind(this)}
                />
                {emailView}
                <EmailForm />
            </div>
        );
    }
}
