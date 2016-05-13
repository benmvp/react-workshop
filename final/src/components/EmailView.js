import {EMAIL_PROP_TYPE} from './constants';
import React from 'react';

export default class EmailView extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onClose: React.PropTypes.func.isRequired
    }

    render() {
        let {
            email: {subject, from, to, message},
            onClose
        } = this.props;
        let rawMessage = {__html: message};

        return (
            <div>
                <button onClick={onClose}>Close</button>
                <h1>{subject}</h1>
                <h2>From: {from}</h2>
                <h2>To: {to}</h2>
                <div dangerouslySetInnerHTML={rawMessage} />
            </div>
        );
    }
}
