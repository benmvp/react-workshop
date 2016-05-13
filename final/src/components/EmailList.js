import {EMAIL_PROP_TYPE} from './constants';
import EmailListItem from './EmailListItem';
import React from 'react';

import './EmailList.scss';

export default class EmailList extends React.Component {
    static propTypes = {
        emails: React.PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
        onItemSelect: React.PropTypes.func.isRequired,
        onItemDelete: React.PropTypes.func.isRequired,
        onItemMarkUnread: React.PropTypes.func.isRequired,

        selectedEmailId: React.PropTypes.number
    }

    render() {
        let {
            emails,
            selectedEmailId,
            onItemSelect,
            onItemDelete,
            onItemMarkUnread
        } = this.props;
        let emailComponents = emails.map((email) => (
            <li key={email.id} className="email-list__item">
                <EmailListItem
                    email={email}
                    isSelected={email.id === selectedEmailId}
                    onSelect={onItemSelect.bind(null, email.id)}
                    onDelete={onItemDelete.bind(null, email.id)}
                    onMarkUnread={onItemMarkUnread.bind(null, email.id)}
                />
            </li>
        ));

        return (
            <ul className="email-list">
                {emailComponents}
            </ul>
        );
    }
}
