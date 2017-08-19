import React from 'react';
import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';
import {emails} from './utils/data';

class App extends React.Component {
    render() {
        return (
            <main>
                <EmailList emails={emails} />
                <EmailView />
                <EmailForm />
            </main>
        );
    }
}

export default App;
