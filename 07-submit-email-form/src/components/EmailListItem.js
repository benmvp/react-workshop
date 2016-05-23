import React from 'react';
import {EMAIL_PROP_TYPE} from './constants';

export default class EmailListItem extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onSelect: React.PropTypes.func
    }

    _handleClick(e) {
        let {email, onSelect} = this.props;

        if (onSelect) {
            e.stopPropagation();
            onSelect(email.id);
        }
    }

    render() {
        let {
            email: {from, subject}
        } = this.props;

        return (
            <div onClick={this._handleClick.bind(this)}>
                <span>{from}</span>
                <span>{subject}</span>
            </div>
        );
    }
}
