import React from 'react';
import PropTypes from 'prop-types';

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

EmailListItem.propTypes = {
    from: PropTypes.string,
    subject: PropTypes.string
};

export default EmailListItem;
