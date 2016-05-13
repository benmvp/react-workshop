import classNames from 'classnames';
import {EMAIL_PROP_TYPE} from './constants';
import React from 'react';

import './EmailListItem.scss';

const EmailListItemStatus = ({isSelected, unread, onDelete, onMarkUnread}) => {
    let markUnreadButton;

    if (isSelected && !unread) {
        markUnreadButton = (
            <button onClick={onMarkUnread}>Mark unread</button>
        );
    }

    return (
        <span>
            {markUnreadButton}
            <button onClick={onDelete}>Delete</button>
        </span>
    );
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
                'email-list-item--selected': isSelected,
                'email-list-item--unread': unread
            }
        );

        return (
            <div className={className} onClick={onSelect}>
                <span className="email-list-item__from">{from}</span>

                <span className="email-list-item__subject">{subject}</span>

                <span className="email-list-item__status">
                    <EmailListItemStatus isSelected={isSelected}
                        unread={unread}
                        onDelete={onDelete}
                        onMarkUnread={onMarkUnread}
                    />
                </span>
            </div>
        );
    }
}
