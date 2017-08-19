import React from 'react';
import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emails: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:9090/emails')
            .then((response) => {
                return response.json();
            })
            .then((listOfEmails) => {
                this.setState({
                    emails: listOfEmails
                });
            });
    }

    render() {
        return (
            <main>
                <EmailList emails={this.state.emails} />
                <EmailView />
                <EmailForm />
            </main>
        );
    }
}

export default App;
