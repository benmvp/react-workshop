import {EMAIL_PROP_TYPE} from './constants';
import EmailListItem from './EmailListItem';
import React from 'react';

export default class EmailList extends React.Component {
    static propTypes = {
        emails: React.PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
        onItemSelected: React.PropTypes.func.isRequired,
        onItemMarkedUnread: React.PropTypes.func.isRequired,

        selectedEmailId: React.PropTypes.number
    }

    render() {
        let {
            emails,
            selectedEmailId,
            onItemSelected,
            onItemMarkedUnread
        } = this.props;
        let emailComponents = emails.map((email) => (
            <EmailListItem key={email.id}
                email={email}
                isSelected={email.id === selectedEmailId}
                onSelected={onItemSelected.bind(null, email.id)}
                onMarkedUnread={onItemMarkedUnread.bind(null, email.id)}
            />
        ));

        return (
            <ul className="email-list">
                {emailComponents}
            </ul>
        );
    }
}
