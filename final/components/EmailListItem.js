import classNames from 'classnames';
import React from 'react';

export default class EmailListItem extends React.Component {
    static propTypes = {
        from: React.PropTypes.string.isRequired,
        subject: React.PropTypes.string.isRequired,
        unread: React.PropTypes.bool
    }

    static defaultProps = {
        unread: false
    }

    render() {
        let {from, subject, unread} = this.props;
        let className = classNames(
            'email-list-item',
            {
                'email-list-item--unread': unread
            }
        );

        return (
            <li className={className}>
                {from} - {subject}
            </li>
        );
    }
}
