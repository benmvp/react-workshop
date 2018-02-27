import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {EMAIL_PROP_TYPE} from './constants';

import './EmailView.css';

export default class EmailView extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  _handleClose = (e) => {
    e.stopPropagation();
    this.props.onClose();
  }

  _handleDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete();
  }

  render() {
    let {email: {subject, from, date, message}} = this.props;
    let rawMessage = {__html: message};

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
        <div className="email-view__button-bar">
          <button onClick={this._handleDelete}>Delete</button>
          <button onClick={this._handleClose}>Close</button>
        </div>
      </section>
    );
  }
}
