import React, {Component} from 'react';

import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';

import './App.css';

const EMAILS = [
  {
    id: 1,
    from: 'alittle0@chronoengine.com',
    subject: 'Mauris lacinia sapien quis libero',
  },
  {
    id: 2,
    from: 'amurray1@mit.edu',
    subject: 'Mauris ullamcorper purus sit amet nulla',
  },
  {
    id: 3,
    from: 'dmccoy2@bluehost.com',
    subject: 'Suspendisse potenti',
  },
  {
    id: 4,
    from: 'raustin3@hexun.com',
    subject: 'Maecenas rhoncus aliquam lacus',
  },
  {
    id: 5,
    from: 'rwagner4@instagram.com',
    subject: 'Pellentesque ultrices mattis odi',
  },
];

export default class App extends Component {
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
