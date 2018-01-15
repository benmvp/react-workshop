import React, {PureComponent} from 'react';

import {EMAIL_PROP_TYPE} from './constants';

import './EmailListItem.css';

export default class EmailListItem extends PureComponent {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired
  };

  render() {
    let {email: {from, subject}} = this.props;

    return (
      <div className="email-list-item">
        <span>{from}</span>
        <span>{subject}</span>
      </div>
    );
  }
}
