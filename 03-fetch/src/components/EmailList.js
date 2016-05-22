import React from 'react';
import EmailListItem from './EmailListItem';

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
        )
    }

    render() {
        let {emails} = this.props;
        let emailComponents = emails.map((email) => (
            <EmailListItem
                key={email.id}
                id={email.id}
                from={email.from}
                subject={email.subject}
            >
              {email.message}
            </EmailListItem>
        ));

        return (
            <ul>
                {emailComponents}
            </ul>
        );
    }
}
