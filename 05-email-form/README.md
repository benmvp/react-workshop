# Step 5 - Email Form

The goal of this step is learning how to deal with forms. HTML form elements work a little bit differently from other DOM elements in React, because form elements naturally keep some internal state. Regular HTML forms _do_ work in React, but in most cases, it's convenient to have React keep track of the data that the user has entered into a form. The standard way to achieve this is with a technique called ["controlled components"](https://facebook.github.io/react/docs/forms.html#controlled-components).

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](src/components/EmailForm.js).

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
cp -r 04-email-view workshop
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

In `EmailForm`, create a form with **from** & **message** fields:

```js
export default class EmailForm extends PureComponent {
  render() {
    return (
      <form className="email-form">
        <fieldset>
          <label htmlFor="from">From:</label>
          <input type="email" id="from" value="" placeholder="jill@me.com" />
        </fieldset>
        <fieldset>
          <label htmlFor="message">Message:</label>
          <textarea id="message" value="" placeholder="[Insert message here]" />
        </fieldset>
      </form>
    );
  }
}
```

As of now, the DOM is maintaining the state of the input fields; React has no idea what the values of the fields are. They are currently ["uncontrolled components"](https://reactjs.org/docs/uncontrolled-components.html). We want to make them "controlled components" so we can keep track of their state within `EmailForm`.

Add new state properties for `from` & `message` and pass those state properties as the `value` of the corresponding input fields. Then `onChange` of the fields, update the corresponding state properties.

```js
export default class EmailForm extends PureComponent {
  state = {
    from: '',
    message: ''
  }

  _updateFormFieldState(name, e) {
    this.setState({[name]: e.target.value});
  }

  _handleFromChanged(e) {
    this._updateFormFieldState('from', e);
  }

  _handleMessageChanged(e) {
    this._updateFormFieldState('message', e);
  }

  render() {
    let {from, message} = this.state;

    return (
      <form className="email-form">
        <fieldset>
          <label htmlFor="from">From:</label>
          <input
            type="email"
            id="from"
            value={from}
            placeholder="jill@me.com"
            onChange={this._handleFromChanged.bind(this)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            placeholder="[Insert message here]"
            onChange={this._handleMessageChanged.bind(this)}
          />
        </fieldset>
      </form>
    );
  }
}
```

Use the [React Developer Tools](https://github.com/facebook/react-devtools#installation) to watch the `state` of `EmailForm` update as you type into the fields.

## Exercises

- Add **to** & **subject** form fields in between **from** & **message**
- **BONUS:** Leveraging [`Function.prototype.bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind), call `this._updateFormFieldState` directly in the `onChange` handlers for each input to keep the code DRY

## Next

Go to [Step 6 - Submit email form](../06-submit-email-form/).

## Resources

- [Forms](https://facebook.github.io/react/docs/forms.html)
- [DOM Elements](https://facebook.github.io/react/docs/dom-elements.html)

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
