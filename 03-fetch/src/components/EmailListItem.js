import React from 'react';
import {EMAIL_PROP_TYPE} from './constants';

export default class EmailListItem extends React.Component {
    static propTypes = {
        email: EMAIL_PROP_TYPE.isRequired
    }

    render() {
        let {
            email: {from, subject}
        } = this.props;

        return (
            <div>
                <span>{from}</span>
                <span>{subject}</span>
            </div>
        );
    }
}
