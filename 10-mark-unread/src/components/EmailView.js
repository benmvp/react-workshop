import React from 'react';
import {EMAIL_PROP_TYPE} from './constants';

export default class EmailView extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired,
        onClose: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,

        onMarkUnread: React.PropTypes.func,
        onMarkRead: React.PropTypes.func
    }

    _handleCloseClick(e) {
        e.stopPropagation();
        this.props.onClose();
    }

    _handleDeleteClick(e) {
        e.stopPropagation();
        this.props.onDelete();
    }

    _handleMarkUnreadClick(e) {
        e.stopPropagation();

        if (this.props.onMarkUnread) {
            this.props.onMarkUnread();
        }
    }

    _handleMarkReadClick(e) {
        e.stopPropagation();

        if (this.props.onMarkRead) {
            this.props.onMarkRead();
        }
    }

    render() {
        let {
            email: {subject, from, date, message, unread}
        } = this.props;
        let rawMessage = {__html: message};
        let markUnreadReadButton = unread
            ? (<button onClick={this._handleMarkReadClick.bind(this)}>Mark Read</button>)
            : (<button onClick={this._handleMarkUnreadClick.bind(this)}>Mark Unread</button>);

        return (
            <div>
                <h1>{subject}</h1>
                <h2>From: <a href={`mailto:${from}`}>{from}</a></h2>
                <h3>{date}</h3>
                <div dangerouslySetInnerHTML={rawMessage} />
                {markUnreadReadButton}
                <button onClick={this._handleDeleteClick.bind(this)}>Delete</button>
                <button onClick={this._handleCloseClick.bind(this)}>Close</button>
            </div>
        );
    }
}
