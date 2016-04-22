import {EMAIL_PROP_TYPE} from './constants';
import EmailListItem from './EmailListItem';
import React from 'react';

export default class EmailList extends React.Component {
    static propTypes = {
        emails: React.PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
        onItemSelected: React.PropTypes.func.isRequired
    }

    render() {
        let {emails, onItemSelected} = this.props;
        let emailComponents = emails.map((email) => (
            <EmailListItem key={email.id} email={email} onSelected={onItemSelected} />
        ));

        return (
            <ul className="email-list">
                {emailComponents}
            </ul>
        );
    }
}
