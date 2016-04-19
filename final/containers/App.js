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
        emails: []
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

    render() {
        return (
            <div>
                <EmailList emails={this.state.emails} />
                <EmailView />
                <EmailForm />
            </div>
        );
    }
}
