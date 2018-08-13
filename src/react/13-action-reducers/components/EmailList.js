import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EmailListItem from './EmailListItem';
import {EMAIL_PROP_TYPE} from './constants';

import './EmailList.css';

export default class EmailList extends Component {
  static propTypes = {
    emails: PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    onItemMarkUnread: PropTypes.func.isRequired,

    selectedEmailId: PropTypes.number
  };

  render() {
    let {
      emails,
      onItemSelect,
      onItemDelete,
      onItemMarkUnread,
      selectedEmailId
    } = this.props;
    let emailComponents = emails.map(email =>
      <li key={email.id} className="email-list__item">
        <EmailListItem
          email={email}
          onSelect={onItemSelect}
          onDelete={onItemDelete}
          onMarkUnread={onItemMarkUnread}
          isSelected={email.id === selectedEmailId}
        />
      </li>
    );

    return (
      <ul className="email-list">
        {emailComponents}
      </ul>
    );
  }
}
