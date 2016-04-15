import EmailListItem from './EmailListItem';
import React from 'react';

export default class EmailList extends React.Component {
    static propTypes = {
        emails: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number.isRequired,
                from: React.PropTypes.string.isRequired,
                subject: React.PropTypes.string.isRequired,
                message: React.PropTypes.string.isRequired,
                unread: React.PropTypes.bool
            })
        ).isRequired
    }

    _renderItems(emails) {
        return emails.map((emailInfo) => (
            <EmailListItem key={emailInfo.id} from={emailInfo.from} subject={emailInfo.subject} unread={emailInfo.unread}>
                {emailInfo.message}
            </EmailListItem>
        ));
    }

    render() {
        return (
            <ul className="email-list">
                {this._renderItems(this.props.emails)}
            </ul>
        );
    }
}
