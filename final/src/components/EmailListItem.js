import classNames from 'classnames';
import {EMAIL_PROP_TYPE} from './constants';
import React from 'react';

const EmailListItemStatus = ({isSelected, unread, onDelete, onMarkUnread}) => {
    let component = null;

    if (isSelected) {
        let markUnreadButton;

        if (!unread) {
            markUnreadButton = (
                <button onClick={onMarkUnread}>Mark unread</button>
            );
        }

        component = (
            <span>
                {markUnreadButton}
                <button onClick={onDelete}>Delete</button>
            </span>
        );
    }

    return component;
};

export default class EmailListItem extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onSelect: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        onMarkUnread: React.PropTypes.func.isRequired,

        isSelected: React.PropTypes.bool
    }

    render() {
        let {
            email: {from, subject, unread},
            isSelected,
            onSelect,
            onDelete,
            onMarkUnread
        } = this.props;
        let className = classNames(
            'email-list-item',
            {
                'email-list-item--unread': unread
            }
        );

        return (
            <li className={className} onClick={onSelect}>
                {from} - {subject}

                <EmailListItemStatus isSelected={isSelected}
                    unread={unread}
                    onDelete={onDelete}
                    onMarkUnread={onMarkUnread}
                />
            </li>
        );
    }
}
