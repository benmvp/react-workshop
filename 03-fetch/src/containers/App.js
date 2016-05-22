import React from 'react';
import 'whatwg-fetch';

import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import EmailForm from '../components/EmailForm';

export default class EmailApp extends React.Component {
    state = {
        emails: []
    }

    componentDidMount() {
        // Retrieve emails from server once we know DOM exists
        fetch('http://localhost:9090/emails')
            .then((res) => res.json())
            .then((emails) => this.setState({emails}))
            .catch((ex) => console.error(ex));
    }

    render() {
        let {emails} = this.state;

        return (
            <main>
                <EmailList emails={emails} />
                <EmailView />
                <EmailForm />
            </main>
        );
    }
}
