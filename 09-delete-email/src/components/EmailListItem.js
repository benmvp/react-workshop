import React from 'react';
import {EMAIL_PROP_TYPE} from './constants';

export default class EmailListItem extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onDelete: React.PropTypes.func.isRequired,
        onSelect: React.PropTypes.func
    }

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
        let {
            email: {from, subject}
        } = this.props;

        return (
            <div onClick={this._handleClick.bind(this)}>
                <span>{from}</span>
                <span>{subject}</span>
                <button onClick={this._handleDelete.bind(this)}>Delete</button>
            </div>
        );
    }
}
