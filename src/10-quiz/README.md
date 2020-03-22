# Step 10 - Final Quiz!

Until now, we've only been able to see the first page of results from the Giphy API. We need pagination UI in order to see more results.

The goal of this final step, the quiz, is to solidify your learning by applying it to build your own pagination component.

<details>
  <summary><b>Help! I didn't finish the previous step!</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../00-begin) if you have not yet followed them.

Ensure you're in the root folder of the repo:

```sh
cd react-workshop
```

Remove the existing workshop directory if you had previously started elsewhere:

```sh
rm -rf src/workshop
```

Copy the previous step as a starting point:

```sh
cp -r src/09-loading-states src/workshop
```

Ensure [`src/index.js`](../index.js#L3) is still pointing to the `workshop` App:

```js
import App from './workshop/App'
```

Start the app:

```sh
npm start
```

After the app is initially built, a new browser window should open up at [http://localhost:3000/](http://localhost:3000/), and you should be able to continue on with the tasks below.

</details>

## Exercise

- Build a `Pagination` component that will allow you to paginate through the giphy results
  - `Pagination` has "Previous" & "Next" links/buttons
  - Display the `<Pagination />` both above and below the `<Results />`
  - Use the `offset` property in the call to `getResults()` to request subsequent pages of results
  - Use the `total` property in the return value from `getRequest()` to calculate how many pages there are
- **BONUS:** Disable the "Previous" & "Next" links/buttons when there are no previous/next pages
- **BONUS:** Use the Foundation [Pagination](https://get.foundation/sites/docs/pagination.html) as your HTML & CSS to support jumping to specific pages

## Next

Go to the [End](../end/).

## Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
