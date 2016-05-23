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
        <span className="email-list-item__status">
            {markUnreadButton}
            <button onClick={onDelete}>Delete</button>
        </span>
    );
};

export default class EmailListItem extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        onMarkUnread: React.PropTypes.func.isRequired,
        onSelect: React.PropTypes.func,

        isSelected: React.PropTypes.bool
    }

    _handleDelete(e) {
        e.stopPropagation();
        this.props.onDelete(this.props.email.id);
    }

    _handleMarkUnread(e) {
        e.stopPropagation();
        this.props.onMarkUnread(this.props.email.id);
    }

    _handleClick(e) {
        let {email, onSelect} = this.props;

        if (onSelect) {
            e.stopPropagation();
            onSelect(email.id);
        }
    }

    render() {
        let {
            email: {from, subject, unread},
            isSelected
        } = this.props;
        let className = classNames(
            'email-list-item',
            {
                'email-list-item--selected': isSelected,
                'email-list-item--unread': unread
            }
        );

        return (
            <div className={className} onClick={this._handleClick.bind(this)}>
                <span className="email-list-item__from">{from}</span>

                <span className="email-list-item__subject">{subject}</span>

                <EmailListItemStatus isSelected={isSelected}
                    unread={unread}
                    onDelete={this._handleDelete.bind(this)}
                    onMarkUnread={this._handleMarkUnread.bind(this)}
                />
            </div>
        );
    }
}
