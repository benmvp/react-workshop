import React from 'react';
import EmailListItem from './EmailListItem';
import {EMAIL_PROP_TYPE} from './constants';

export default class EmailList extends React.Component {
    static propTypes = {
        emails: React.PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
        onItemSelect: React.PropTypes.func.isRequired
    }

    render() {
        let {emails, onItemSelect} = this.props;
        let emailComponents = emails.map((email) => (
            <li key={email.id}>
                <EmailListItem
                    email={email}
                    onSelect={onItemSelect}
                />
            </li>
        ));

        return (
            <ul>
                {emailComponents}
            </ul>
        );
    }
}
