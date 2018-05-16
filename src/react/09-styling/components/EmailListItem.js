import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {EMAIL_PROP_TYPE} from './constants';

import './EmailListItem.css';

export default class EmailListItem extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onDelete: PropTypes.func.isRequired,
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

  render() {
    let {email: {from, subject}, isSelected} = this.props;
    let className = classNames('email-list-item', {
      'email-list-item--selected': isSelected
    });
  
    return (
      <div className={className} onClick={this._handleClick}>
        <span className="email-list-item__from">
          {from}
        </span>
        <span className="email-list-item__subject">
          {subject}
        </span>
        <span className="email-list-item__status">
          <button onClick={this._handleDelete}>Delete</button>
        </span>
      </div>
    );
  }
}
