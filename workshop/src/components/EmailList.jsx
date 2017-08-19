import React from 'react';
import EmailListItem from './EmailListItem';

class EmailList extends React.Component {
    render() {
        let {emails, onItemSelect} = this.props;
        let emailComponents = emails.map((email) =>
            <li key={email.id}>
                <EmailListItem email={email} />
            </li>
        );

        return (
            <ul>
                {emailComponents}
            </ul>
        );
    }
}

export default EmailList;
