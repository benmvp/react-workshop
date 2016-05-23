class EmailListItem extends React.Component {
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

class EmailList extends React.Component {
    render() {
        let {emails, onItemSelect} = this.props;
        let emailComponents = emails.map((email) => (
            <li key={email.id}>
                <EmailListItem
                    email={email}
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

class EmailView extends React.Component {
    render() {
        return (
            <div>
                <h2>View selected email</h2>
            </div>
        );
    }
}

class EmailForm extends React.Component {
    render() {
        return (
            <div>
                <h2>Add a new email</h2>
            </div>
        );
    }
}

const emails = [
    {
        id: 1,
        date: '01/19/2016',
        from: 'alittle0@chronoengine.com',
        to: 'i@me.com',
        unread: false,
        subject: 'Mauris lacinia sapien quis libero.',
        message: 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.<br /><br />Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.<br /><br />Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.<br /><br />😎😋😛<br /><br /> Maecenas rhoncus aliquam lacus.'
    },
    {
        id: 2,
        date: '11/18/2015',
        from: 'amurray1@mit.edu',
        to: 'i@me.com',
        unread: false,
        subject: 'Mauris ullamcorper purus sit amet nulla.',
        message: '<em><strong>Sed ante.</strong></em> Vivamus tortor. Duis mattis egestas metus.<br /><br />Aenean fermentum. 😀 Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.<br /><br />Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.'
    },
    {
        id: 3,
        date: '04/12/2016',
        from: 'dmccoy2@bluehost.com',
        to: 'i@me.com',
        unread: false,
        subject: 'Suspendisse potenti.',
        message: 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.<br /><br />Pellentesque at nulla. Suspendisse potenti.'
    }
];

class EmailApp extends React.Component {
    render() {
        return (
            <main>
                <EmailList emails={emails} />
                <EmailView />
                <EmailForm />
            </main>
        );
    }
}

ReactDOM.render(
    <EmailApp />,
    document.getElementById('app')
);
