import React from 'react';
import ReactDOM from 'react-dom';
import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';
import {emails} from './utils/data';

class EmailApp extends React.Component {
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

ReactDOM.render(<EmailApp />, document.getElementById('app'));
