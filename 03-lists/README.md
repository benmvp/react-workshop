# Step 3 - Lists

The goal of this step is to practice transforming lists of data into lists of components which can be included in JSX. As a result, we'll convert the `EmailList` component from statically rendering the three `EmailListItem` components to dynamically rendering an arbitrary list of `EmailListItem` components. We'll also make use of more advanced prop types.

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/).

## Restart Setup

If you didn't successfully complete the previous step, you can jump right in by copying the step and installing the dependencies.

Ensure you're in the root folder of the repo:

```sh
cd react-workshop
```

Remove the existing workshop directory if you had previously started elsewhere:

```sh
rm -rf workshop
```

Copy the previous step as a starting point:

```sh
cp -r 02-components workshop
```

Change into the `workshop` directory:

```sh
cd workshop
```

Install all of the dependencies ([`yarn`](https://yarnpkg.com/en/) is preferred):

```sh
# Yarn
yarn

# ...or NPM
npm install
```

Start the app:

```sh
# Yarn
yarn start

# ...or NPM
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

## Tasks

In [`EmailList.js`](src/components/EmailList.js), pull out the raw data that makes up the three `EmailListItem` components into an `EMAILS` `const` array. Use [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to convert the array of data into an array of components:

```js
const EMAILS = [
  {
    id: 1,
    from: 'alittle0@chronoengine.com',
    subject: 'Mauris lacinia sapien quis libero.'
  },
  {
    id: 2,
    from: 'amurray1@mit.edu',
    subject: 'Mauris ullamcorper purus sit amet nulla.'
  },
  {
    id: 3,
    from: 'dmccoy2@bluehost.com',
    subject: 'Suspendisse potenti.'
  }
];

export default class EmailList extends PureComponent {
  render() {
    let emailComponents = EMAILS.map((email) =>
      <li key={email.id}>
        <EmailListItem from={email.from} subject={email.subject} />
      </li>
    );

    return (
      <ul className="email-list">
        {emailComponents}
      </ul>
    );
  }
}
```

Update `EmailListItem` to take a single `email` prop instead of individual props for each email property (don't forget the `propTypes`!):

```js
export default class EmailListItem extends PureComponent {
  static propTypes = {
    email: PropTypes.shape({
      from: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    let {email: {from, subject}} = this.props;

    return (
      <div className="email-list-item">
        <span>{from}</span>
        <span>{subject}</span>
      </div>
    );
  }
}
```

The `EmailList` component will need to be updated to pass the `email` prop to `EmailListItem`.

## Exercises

- Move the `EMAILS` out of `EmailList` into the top-level `App`
- Pass `EMAILS` in `App` as the `emails` prop to `<EmailList>`
- Declare a new `emails` prop type using `PropTypes.arrayOf()` in `EmailList` (you can share common prop types with `EmailListItem` in a [`components/constants.js`](src/components/constants.js) file)
- Use `this.props.emails` in the `map()` within `render()` of `EmailList`

## Next

Go to [Step 4 - Fetch](../04-fetch/).

## Resources

- [Lists and Keys](https://facebook.github.io/react/docs/lists-and-keys.html)
- [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
