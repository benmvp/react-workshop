import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {EMAIL_PROP_TYPE} from './constants';

import './EmailListItem.css';

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
    let {email: {from, subject, unread}, isSelected} = this.props;
    let markUnreadButton;

    if (isSelected && !unread) {
      markUnreadButton = (
        <button onClick={this._handleMarkUnread}>Mark unread</button>
      );
    }

    return (
      <div className="email-list-item" onClick={this._handleClick}>
        <span>
          {from}
        </span>
        <span>
          {subject}
        </span>
        {markUnreadButton}
        <button onClick={this._handleDelete}>Delete</button>
      </div>
    );
  }
}
