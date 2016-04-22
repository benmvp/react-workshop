import classNames from 'classnames';
import {EMAIL_PROP_TYPE} from './constants';
import React from 'react';

export default class EmailListItem extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onSelected: React.PropTypes.func.isRequired
    }

    _handleClick() {
        this.props.onSelected(this.props.email.id);
    }

    render() {
        let {
            email: {from, subject, unread}
        } = this.props;
        let className = classNames(
            'email-list-item',
            {
                'email-list-item--unread': unread
            }
        );

        return (
            <li className={className} onClick={this._handleClick.bind(this)}>
                {from} - {subject}
            </li>
        );
    }
}
