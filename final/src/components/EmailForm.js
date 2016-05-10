import React from 'react';

const DEFAULT_FORM_VALUES = {
    from: '',
    to: 'me@abcdef.com',
    subject: '',
    message: ''
};

export default class EmailForm extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired
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
            <aside>
                <h1>Compose</h1>

                <form onSubmit={this._handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="from">From:</label>
                        <input type="email" id="from" value={from} onChange={this._handleFromChanged.bind(this)} />
                    </div>
                    <div>
                        <label htmlFor="to">To:</label>
                        <input type="email" id="to" value={to} onChange={this._handleToChanged.bind(this)} />
                    </div>
                    <div>
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" id="subject" value={subject} onChange={this._handleSubjectChanged.bind(this)} />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" value={message} onChange={this._handleMessageChanged.bind(this)} />
                    </div>

                    <button type="submit">Send email</button>
                </form>
            </aside>
        );
    }
}
