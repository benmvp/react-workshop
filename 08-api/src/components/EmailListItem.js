import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {EMAIL_PROP_TYPE} from './constants';

import './EmailListItem.css';

export default class EmailListItem extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func
  };

  _handleClick(e) {
    let {email, onSelect} = this.props;

    if (onSelect) {
      e.stopPropagation();
      onSelect(email.id);
    }
  }

  _handleDelete(e) {
    e.stopPropagation();
    this.props.onDelete(this.props.email.id);
  }

  render() {
    let {email: {from, subject}} = this.props;

    return (
      <div className="email-list-item" onClick={this._handleClick.bind(this)}>
        <span>
          {from}
        </span>
        <span>
          {subject}
        </span>
        <button onClick={this._handleDelete.bind(this)}>Delete</button>
      </div>
    );
  }
}
