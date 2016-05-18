import React from 'react';

import './EmailForm.scss';

const DEFAULT_FORM_VALUES = {
    from: '',
    to: 'me@abcdef.com',
    subject: '',
    message: ''
};

export default class EmailForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
        onCancel: React.PropTypes.func
    }

    state = DEFAULT_FORM_VALUES

    _updateFormFieldState(name, e) {
        this.setState({[name]: e.target.value});
    }

    _handleFromChanged(e) {
        this._updateFormFieldState('from', e);
    }

    _handleToChanged(e) {
        this._updateFormFieldState('to', e);
    }

    _handleSubjectChanged(e) {
        this._updateFormFieldState('subject', e);
    }

    _handleMessageChanged(e) {
        this._updateFormFieldState('message', e);
    }

    _handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    _handleSubmit(e) {
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
        }
        else {
            alert('fill out the form!');
        }
    }

    render() {
        let {from, to, subject, message} = this.state;

        return (
            <div className="email-form">
                <form onSubmit={this._handleSubmit.bind(this)}>
                    <div className="email-form__field">
                        <label className="email-form__label" htmlFor="from">From:</label>
                        <input type="email"
                            id="from"
                            className="email-form__input"
                            value={from}
                            onChange={this._handleFromChanged.bind(this)}
                            placeholder="jill@me.com"
                        />
                    </div>
                    <div className="email-form__field">
                        <label className="email-form__label" htmlFor="to">To:</label>
                        <input type="email"
                            id="to"
                            className="email-form__input"
                            value={to}
                            onChange={this._handleToChanged.bind(this)}
                            placeholder="me@me.com"
                        />
                    </div>
                    <div className="email-form__field">
                        <label className="email-form__label" htmlFor="subject">Subject:</label>
                        <input type="text"
                            id="subject"
                            className="email-form__input"
                            value={subject}
                            onChange={this._handleSubjectChanged.bind(this)}
                            placeholder="Awesome React workshop!"
                        />
                    </div>
                    <div className="email-form__field">
                        <label className="email-form__label" htmlFor="message">Message:</label>
                        <textarea id="message"
                        className="email-form__input email-form__input-message"
                            value={message}
                            onChange={this._handleMessageChanged.bind(this)}
                            placeholder="[Insert message here]"
                        />
                    </div>

                    <div className="email-form__button-bar">
                        <button type="submit">Send email</button>
                        <button type="button" onClick={this._handleCancel.bind(this)}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}
