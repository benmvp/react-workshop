import React, {Component} from 'react';

import './EmailForm.css';

export default class EmailForm extends Component {
  state = {
    from: '',
    to: 'me@abcdef.com',
    subject: '',
    message: ''
  };

  _updateFormFieldState = (name, e) => {
    this.setState({[name]: e.target.value});
  }

  render() {
    let {from, to, subject, message} = this.state;

    return (
      <form className="email-form">
        <fieldset>
          <label htmlFor="from">From:</label>
          <input
            type="email"
            id="from"
            value={from}
            placeholder="jill@me.com"
            onChange={this._updateFormFieldState.bind(this, 'from')}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="to"
            value={to}
            placeholder="me@me.com"
            onChange={this._updateFormFieldState.bind(this, 'to')}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            placeholder="Awesome React workshop!"
            onChange={this._updateFormFieldState.bind(this, 'subject')}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            placeholder="[Insert message here]"
            onChange={this._updateFormFieldState.bind(this, 'message')}
          />
        </fieldset>
      </form>
    );
  }
}
