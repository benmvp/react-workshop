import React, {Component} from 'react';

import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';

export default class App extends Component {
  render() {
    return (
      <main className="app">
        <EmailList />
        <EmailView />
        <EmailForm />
      </main>
    );
  }
}
