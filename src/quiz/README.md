# Step 10 - Final Quiz!

Until now, we've only been able to see the first page of results from the Giphy API. We need a pagination UI in order to see more results.

🏅 The goal of this final step, the quiz, is to solidify your learning by applying it to build your own pagination component.

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../README.md#setup) if you have not yet followed them.

Re-run the setup script, but use the previous step as a starting point:

```sh
npm run setup -- src/10-loading-states
```

This will also back up your `src/workshop` folder, saving your work.

Now restart the app:

```sh
npm start
```

After some initial compiling, a new browser window should open up at http://localhost:3000/, and you should be able to continue on with the tasks below.

</details>

## Exercise

- Build a `Pagination` component that will allow you to paginate through the giphy results
  - `Pagination` has "Previous" & "Next" links/buttons
  - Display the `<Pagination />` both above and below the `<Results />`
  - Use the `offset` property in the call to `getResults()` to request subsequent pages of results
  - Use the `total` property in the return value from `getResults()` to calculate how many pages there are
- 🤓 **BONUS:** Disable the "Previous" & "Next" links/buttons when there are no previous/next pages
- 🤓 **BONUS:** Use the Foundation [Pagination](https://get.foundation/sites/docs/pagination.html) as your HTML & CSS to support jumping to specific pages
- Share your `Pagination` component and its use in `App` in a [gist](https://gist.github.com/) on [my AMA](http://www.benmvp.com/ama/)

## 🧠 Elaboration & Feedback

After you're done with the quiz, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Final+Quiz). It will help seal in what you've learned.

## 👉🏾 Next Step

Go to the [End](../end/).

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
