import React, {PureComponent} from 'react';

import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';

const EMAILS = [
  {
    id: 1,
    from: 'alittle0@chronoengine.com',
    subject: 'Mauris lacinia sapien quis libero.'
  },
  {
    id: 2,
    from: 'amurray1@mit.edu',
    subject: 'Mauris ullamcorper purus sit amet nulla.'
  },
  {
    id: 3,
    from: 'dmccoy2@bluehost.com',
    subject: 'Suspendisse potenti.'
  }
];

export default class App extends PureComponent {
  render() {
    return (
      <main className="app">
        <EmailList emails={EMAILS} />
        <EmailView />
        <EmailForm />
      </main>
    );
  }
}
