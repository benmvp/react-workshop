import React from 'react';
import PropTypes from 'prop-types';
import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';

const DEFAULT_POLL_INTERVAL = 2000;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emails: []
        };
    }

    componentDidMount() {
        const {pollInterval} = this.props;

        this.timeout = setTimeout(() => {
            fetch('http://localhost:9090/emails')
                .then((response) => {
                    return response.json();
                })
                .then((listOfEmails) => {
                    this.setState({
                        emails: listOfEmails
                    });
                });
        }, pollInterval);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
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

App.propTypes = {
    pollInterval: PropTypes.number
};

App.defaultProps = {
    pollInterval: DEFAULT_POLL_INTERVAL
};

export default App;
