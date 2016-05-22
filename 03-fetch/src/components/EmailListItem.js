import React from 'react';

export default class EmailListItem extends React.Component {
    static propTypes = {
        id: React.PropTypes.number.isRequired,
        from: React.PropTypes.string.isRequired,
        subject: React.PropTypes.string.isRequired,
        children: React.PropTypes.node.isRequired
    }

    render() {
        let {id, from, subject, children} = this.props;
        let rawMessage = {__html: children};

        return (
            <li>
                <span>{id}</span> -
                <span>{from}</span> -
                <span>{subject}</span>
                <span dangerouslySetInnerHTML={rawMessage} />
            </li>
        );
    }
}
