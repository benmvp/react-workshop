import {EMAIL_PROP_TYPE} from './constants';
import React from 'react';

import './EmailView.scss';

export default class EmailView extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onClose: React.PropTypes.func.isRequired
    }

    render() {
        let {
            email: {subject, from, date, message},
            onClose
        } = this.props;
        let rawMessage = {__html: message};

        return (
            <div className="email-view">
                <h1>{subject}</h1>
                <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
                <h3>{date}</h3>
                <div dangerouslySetInnerHTML={rawMessage} />
                <button className="email-view__close" onClick={onClose}>Close</button>
            </div>
        );
    }
}
