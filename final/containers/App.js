import EmailForm from '../components/EmailForm';
import EmailList from '../components/EmailList';
import EmailView from '../components/EmailView';
import React from 'react';

const EMAILS = [
    {
        'id': 1,
        'date': '01/01/2016 12:13:14',
        'unread': false,
        'to': 'me@abcdef.com',
        'from': 'jane@abcdef.com',
        'subject': 'Happy new year!',
        'message': 'Just wanted to welcome you into 2016!'
    },
    {
        'id': 3,
        'date': '02/03/2016 15:24:58',
        'unread': false,
        'to': 'me@abcdef.com',
        'from': 'potus@us.gov',
        'subject': 'New owner of this account',
        'message': 'In January 2017, my time in office will be over and there will be a new owner of this account'
    },
    {
        'id': 2,
        'date': '01/15/2016 19:18:17',
        'unread': true,
        'to': 'me@abcdef.com',
        'from': 'kobe@bryant.com',
        'subject': 'Retirement party!',
        'message': '<p>Hello,</p><p>After 20 years in the NBA, I\'ve decided to hang up my shoes and call it a career. I\'ve enjoyed watching you watch me play and I would like to formally invite you to my retirement party next week. Hope you can make it!</p><p>Mamba out</p>'
    }
];

export default class App extends React.Component {
    render() {
        return (
            <div>
                <EmailList emails={EMAILS} />
                <EmailView />
                <EmailForm />
            </div>
        );
    }
}
