import React from 'react';
import EmailListItem from './EmailListItem';
import {EMAIL_PROP_TYPE} from './constants';

export default class EmailList extends React.Component {
    static propTypes = {
        emails: React.PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired
    }

    render() {
        let {emails} = this.props;
        let emailComponents = emails.map((email) => (
            <li key={email.id}>
                <EmailListItem email={email}/>
            </li>
        ));

        return (
            <ul>
                {emailComponents}
            </ul>
        );
    }
}
