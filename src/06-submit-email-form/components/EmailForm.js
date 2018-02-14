import React, {Component} from 'react';
import PropTypes from 'prop-types';

const DEFAULT_FORM_VALUES = {
  from: '',
  to: 'me@abcdef.com',
  subject: '',
  message: ''
};

export default class EmailForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  state = DEFAULT_FORM_VALUES;

  _updateFormFieldState = (name, e) => {
    this.setState({[name]: e.target.value});
  }

  _handleSubmit = (e) => {
    e.preventDefault();

    let {from, to, subject, message} = this.state;

    // super simple validation
    if (from && to && subject && message) {
      // call handler with email info
      this.props.onSubmit({
        from,
        to,
        subject,
        message
      });

      // reset the form to initial values
      this.setState(DEFAULT_FORM_VALUES);
    } else {
      alert('fill out the form!');
    }
  }

  render() {
    let {from, to, subject, message} = this.state;

    return (
      <form className="email-form" onSubmit={this._handleSubmit}>
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

        <footer>
          <button type="submit">Send email</button>
        </footer>
      </form>
    );
  }
}
