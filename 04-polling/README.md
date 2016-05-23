# Step 4 - Long polling

## Setup

None

## Tasks

- Add long polling by adding call to `setInterval` in [`componentDidMount`](https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount) & `clearInterval` in [`componentWillUnmount`](https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount)
- Add `pollInterval` prop to [App.js](src/containers/App.js) that defaults to `2000`, but [index.js](src/index.js) passes in `5000`

## Next

Go to [Step 5 - Email View](https://github.com/benmvp/react-workshop/tree/master/05-email-view).

## Resources

- [Lifecycle methods](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)
- [lodash Documentation](https://lodash.com/docs)
