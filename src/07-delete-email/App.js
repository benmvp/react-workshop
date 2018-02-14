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
    date: '01/19/2016',
    message: 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.<br /><br />Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.<br /><br />Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
  },
  {
    id: 2,
    from: 'amurray1@mit.edu',
    subject: 'Mauris ullamcorper purus sit amet nulla',
    date: '11/18/2015',
    message: '<em><strong>Sed ante.</strong></em> Vivamus tortor. Duis mattis egestas metus.<br /><br />Aenean fermentum. 😀 Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.<br /><br />Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
  },
  {
    id: 3,
    from: 'dmccoy2@bluehost.com',
    subject: 'Suspendisse potenti',
    date: '04/12/2016',
    message: 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.<br /><br /><ol><li>Phasellus sit amet erat.</li><li>Nulla tempus.</li><li>Vivamus in felis eu sapien cursus vestibulum.</li></ol><br /><br />Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.<br /><br />Duis aliquam convallis nunc. Proin at <a href="http://www.benmvp.com">turpis a pede posuere</a> nonummy. Integer non velit.',
  },
  {
    id: 4,
    from: 'raustin3@hexun.com',
    subject: 'Maecenas rhoncus aliquam lacus',
    date: '07/30/2015',
    message: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
  },
  {
    id: 5,
    from: 'rwagner4@instagram.com',
    subject: 'Pellentesque ultrices mattis odi',
    date: '04/26/2016',
    message: '<h3>In blandit ultrices enim.</h3> Lorem ipsum dolor sit amet, consectetuer adipiscing elit.<br /><br />Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.<br /><br />Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
  },
];

export default class App extends Component {
  state = {
    // Initialize emails state to the `EMAILS` constant
    emails: EMAILS,
    // Initialize selected email ID to -1, indicating nothing is selected.
    // When an email is selected in EmailList, this will be updated to
    // corresponding ID
    selectedEmailId: -1
  }

  _handleItemSelect = (selectedEmailId) => {
    // update state (so that the EmailView will show)
    this.setState({selectedEmailId});
  }

  _handleEmailViewClose = () => {
    // We close the email view by resetting the selected email
    this.setState({selectedEmailId: -1});
  }

  _handleFormSubmit = (newEmail) => {
    this.setState(({emails}) => {
      // Create a full email info by spreading in `id` & `date`
      // Then spread to front of emails state (since it's the newest)
      let newEmails = [
        {
          ...newEmail,
          id: Date.now(),
          date: `${new Date()}`,
        },
        ...emails
      ];

      // Set state with new updated emails list
      return {emails: newEmails};
    });
  }

  _handleItemDelete = (emailId) => {
    this.setState(({emails}) => ({
      // "delete" the email by returning a filtered list that doesn't include it
      emails: emails.filter(email => email.id !== emailId),

      // Also reset `selectedEmailId` since we're deleting it
      selectedEmailId: -1
    }));
  }

  render() {
    let {emails, selectedEmailId} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);
    let emailViewComponent;

    if (selectedEmail) {
      emailViewComponent = (
        <EmailView
          email={selectedEmail}
          onClose={this._handleEmailViewClose.bind(this)}
          onDelete={this._handleItemDelete.bind(this, selectedEmailId)}
        />
      );
    }

    return (
      <main className="app">
        <EmailList
          emails={emails}
          onItemDelete={this._handleItemDelete.bind(this)}
          onItemSelect={this._handleItemSelect.bind(this)}
        />
        {emailViewComponent}
        <EmailForm onSubmit={this._handleFormSubmit.bind(this)} />
      </main>
    );
  }
}
