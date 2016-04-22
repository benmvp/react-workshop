import classNames from 'classnames';
import {EMAIL_PROP_TYPE} from './constants';
import React from 'react';

export default class EmailListItem extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onSelected: React.PropTypes.func.isRequired,
        onMarkedUnread: React.PropTypes.func.isRequired,

        isSelected: React.PropTypes.bool
    }

    render() {
        let {
            email: {from, subject, unread},
            isSelected,
            onSelected,
            onMarkedUnread
        } = this.props;
        let className = classNames(
            'email-list-item',
            {
                'email-list-item--unread': unread
            }
        );
        let status;

        if (isSelected && !unread) {
            status = (
                <button onClick={onMarkedUnread}>Mark unread</button>
            );
        }

        return (
            <li className={className} onClick={onSelected}>
                {from} - {subject}

                {status}
            </li>
        );
    }
}
