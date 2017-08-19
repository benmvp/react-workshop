import React from 'react';

class EmailListItem extends React.Component {
    render() {
        let {email: {from, subject}} = this.props;

        return (
            <div>
                <span>
                    {from}
                </span>
                <span>
                    {subject}
                </span>
            </div>
        );
    }
}

export default EmailListItem;
