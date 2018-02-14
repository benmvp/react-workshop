import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './EmailForm.css';

const DEFAULT_FORM_VALUES = {
  from: '',
  to: 'me@abcdef.com',
  subject: '',
  message: ''
};

export default class EmailForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func
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

  _handleCancel = () => {
    // reset the form to initial values
    this.setState(DEFAULT_FORM_VALUES);

    this.props.onCancel();
  }

  render() {
    let {from, to, subject, message} = this.state;
    let {onCancel} = this.props;
    let cancelButton;

    if (onCancel) {
      cancelButton = (
        <button type="button" onClick={this._handleCancel}>
          Cancel
        </button>
      );
    }

    return (
      <form className="email-form" onSubmit={this._handleSubmit}>
        <fieldset className="email-form__field">
          <label className="email-form__label" htmlFor="from">
            From:
          </label>
          <input
            type="email"
            id="from"
            className="email-form__input"
            value={from}
            placeholder="jill@me.com"
            onChange={this._updateFormFieldState.bind(this, 'from')}
          />
        </fieldset>
        <fieldset className="email-form__field">
          <label className="email-form__label" htmlFor="to">
            To:
          </label>
          <input
            type="email"
            id="to"
            className="email-form__input"
            value={to}
            placeholder="me@me.com"
            onChange={this._updateFormFieldState.bind(this, 'to')}
          />
        </fieldset>
        <fieldset className="email-form__field">
          <label className="email-form__label" htmlFor="subject">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            className="email-form__input"
            value={subject}
            placeholder="Awesome React workshop!"
            onChange={this._updateFormFieldState.bind(this, 'subject')}
          />
        </fieldset>
        <fieldset className="email-form__field">
          <label className="email-form__label" htmlFor="message">
            Message:
          </label>
          <textarea
            id="message"
            className="email-form__input email-form__input-message"
            value={message}
            placeholder="[Insert message here]"
            onChange={this._updateFormFieldState.bind(this, 'message')}
          />
        </fieldset>

        <footer className="email-form__button-bar">
          {cancelButton}
          <button type="submit">Send email</button>
        </footer>
      </form>
    );
  }
}
