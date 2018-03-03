import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {EMAIL_PROP_TYPE} from './constants';

import './EmailListItem.css';

const EmailListItemStatus = ({isSelected, read, onDelete, onMarkUnread}) => {
  let markUnreadButton;

  if (isSelected && read) {
    markUnreadButton = <button onClick={onMarkUnread}>Mark unread</button>;
  }

  return (
    <span className="email-list-item__status">
      {markUnreadButton}
      <button onClick={onDelete}>Delete</button>
    </span>
  );
};

export default class EmailListItem extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func.isRequired,
    onSelect: PropTypes.func,

    isSelected: PropTypes.bool
  };

  _handleClick = (e) => {
    let {email, onSelect} = this.props;

    if (onSelect) {
      e.stopPropagation();
      onSelect(email.id);
    }
  }

  _handleDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete(this.props.email.id);
  }

  _handleMarkUnread = (e) => {
    e.stopPropagation();
    this.props.onMarkUnread(this.props.email.id);
  }

  render() {
    let {email: {from, subject, read}, isSelected} = this.props;
    let className = classNames('email-list-item', {
      'email-list-item--selected': isSelected,
      'email-list-item--unread': !read
    });

    return (
      <div className={className} onClick={this._handleClick}>
        <span className="email-list-item__from">{from}</span>
        <span className="email-list-item__subject">{subject}</span>
        <EmailListItemStatus
          isSelected={isSelected}
          read={read}
          onDelete={this._handleDelete}
          onMarkUnread={this._handleMarkUnread}
        />
      </div>
    );
  }
}
