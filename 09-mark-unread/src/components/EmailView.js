import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {EMAIL_PROP_TYPE} from './constants';

import './EmailView.css';

export default class EmailView extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func,
    onMarkRead: PropTypes.func
  };

  _handleClose(e) {
    e.stopPropagation();
    this.props.onClose();
  }

  _handleDelete(e) {
    e.stopPropagation();
    this.props.onDelete();
  }

  _handleMarkUnread(e) {
    e.stopPropagation();

    if (this.props.onMarkUnread) {
      this.props.onMarkUnread();
    }
  }

  _handleMarkRead(e) {
    e.stopPropagation();

    if (this.props.onMarkRead) {
      this.props.onMarkRead();
    }
  }

  render() {
    let {email: {subject, from, date, message, unread}} = this.props;
    let rawMessage = {__html: message};
    let markUnreadReadButton = unread
      ? <button onClick={this._handleMarkRead.bind(this)}>Mark Read</button>
      : <button onClick={this._handleMarkUnread.bind(this)}>
          Mark Unread
        </button>;

    return (
      <section className="email-view">
        <h1>
          {subject}
        </h1>
        <h2>
          From: <a href={`mailto:${from}`}>{from}</a>
        </h2>
        <h3>
          {date}
        </h3>
        <div dangerouslySetInnerHTML={rawMessage} />
        {markUnreadReadButton}
        <button onClick={this._handleDelete.bind(this)}>Delete</button>
        <button onClick={this._handleClose.bind(this)}>Close</button>
      </section>
    );
  }
}
