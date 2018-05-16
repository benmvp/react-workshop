import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {EMAIL_PROP_TYPE} from './constants';

import './EmailView.css';

const EmailViewButtonBar = ({
  read,
  onDelete,
  onClose,
  onMarkUnread,
  onMarkRead
}) => {
  let markUnreadReadButton = read
    ? (<button onClick={onMarkUnread}>Mark Unread</button>)
    : (<button onClick={onMarkRead}>Mark Read</button>);

  return (
    <div className="email-view__button-bar">
      {markUnreadReadButton}
      <button onClick={onDelete}>Delete</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default class EmailView extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func,
    onMarkRead: PropTypes.func
  };

  _handleClose = (e) => {
    e.stopPropagation();
    this.props.onClose();
  }

  _handleDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete();
  }

  _handleMarkUnread = (e) => {
    e.stopPropagation();

    if (this.props.onMarkUnread) {
      this.props.onMarkUnread();
    }
  }

  _handleMarkRead = (e) => {
    e.stopPropagation();

    if (this.props.onMarkRead) {
      this.props.onMarkRead();
    }
  }

  render() {
    let {email: {subject, from, date, message, read}} = this.props;
    let rawMessage = {__html: message};

    return (
      <section className="email-view">
        <h1>{subject}</h1>
        <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={rawMessage} />
        <EmailViewButtonBar
          read={read}
          onClose={this._handleClose}
          onDelete={this._handleDelete}
          onMarkUnread={this._handleMarkUnread}
          onMarkRead={this._handleMarkRead}
        />
      </section>
    );
  }
}
