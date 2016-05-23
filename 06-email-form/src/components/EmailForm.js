import React from 'react';

export default class EmailForm extends React.Component {
    state = {
        from: '',
        to: 'me@abcdef.com',
        subject: '',
        message: ''
    }

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

    render() {
        let {from, to, subject, message} = this.state;

        return (
            <form>
                <div>
                    <label htmlFor="from">From:</label>
                    <input type="email"
                        id="from"
                        value={from}
                        onChange={this._handleFromChanged.bind(this)}
                        placeholder="jill@me.com"
                    />
                </div>
                <div>
                    <label htmlFor="to">To:</label>
                    <input type="email"
                        id="to"
                        value={to}
                        onChange={this._handleToChanged.bind(this)}
                        placeholder="me@me.com"
                    />
                </div>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input type="text"
                        id="subject"
                        value={subject}
                        onChange={this._handleSubjectChanged.bind(this)}
                        placeholder="Awesome React workshop!"
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message"
                        value={message}
                        onChange={this._handleMessageChanged.bind(this)}
                        placeholder="[Insert message here]"
                    />
                </div>

                <div>
                    <button type="submit">Send email</button>
                </div>
            </form>
        );
    }
}
