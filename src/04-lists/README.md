# Step 4 - Lists

The goal of this step is to practice transforming lists of data into lists of components which can be included in JSX. We'll take the `results` data we have in state in convert it to visible UI!

As always, if you run into trouble with the [tasks](#tasks) or [exercises](#exercises), you can take a peek at the final [source code](./).

<details>
  <summary><b>Help! I didn't finish the previous step! 🚨</b></summary>

If you didn't successfully complete the previous step, you can jump right in by copying the step.

Complete the [setup instructions](../../README.md#setup) if you have not yet followed them.

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
cp -r src/03-api src/workshop
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

## 🐇 Jump Around

[Concepts](#-concepts) | [Tasks](#-tasks) | [Exercises](#-exercises) | [Elaboration & Feedback](#-elaboration--feedback) | [Resources](#-resources)

## ⭐ Concepts

- Rendering dynamic lists of data
- Handling special `key` prop
- Conditionally rendering components

## 📝 Tasks

Use [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to convert the array of results into an array of components so that we can render the giphy images:

```js
return (
  <main>
    <h1>Giphy Search!</h1>

    <form>
      <input
        type="search"
        placeholder="Search Giphy"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />
    </form>

    <section className="callout primary">
      {results.map((item) => (
        <video
          key={item.id}
          src={item.previewUrl}
          alt={item.title}
          loop
          autoPlay
        />
      ))}
    </section>
  </main>
)
```

> NOTE: Be sure to include the [`key` prop](https://reactjs.org/docs/lists-and-keys.html) on the `<li>` elements.

We need to only render the `<section>` when there are results. There are a number of different ways to [conditionally render JSX](https://reactjs.org/docs/conditional-rendering.html). The most common approach is:

```js
return (
  <main>
    <h1>Giphy Search!</h1>

    <form>
      <input
        type="search"
        placeholder="Search Giphy"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />
    </form>

    {results.length > 0 && (
      <section className="callout primary">
        {results.map((item) => (
          <video
            key={item.id}
            src={item.previewUrl}
            alt={item.title}
            loop
            autoPlay
          />
        ))}
      </section>
    )}
  </main>
)
```

Let's add some additional markup and classes around the `<img />` so we can include the giphy title:

```js
{
  results.length > 0 && (
    <section className="callout primary">
      {results.map((item) => (
        <section
          key={item.id}
          className="card"
          style={{
            width: '300px',
            display: 'inline-block',
            marginRight: '16px',
          }}
        >
          <video src={item.previewUrl} alt={item.title} loop autoPlay />
          <section className="card-section">
            <h5>{item.title}</h5>
          </section>
        </section>
      ))}
    </section>
  )
}
```

> NOTE: Be sure to move the `key` prop to the containing `<section>` within the `.map()`.

## 💡 Exercises

- Make the displayed title (`item.title`) link to the Giphy URL (`item.url`)
- Display the Giphy Rating (`item.rating`)
- Add a `<select>` to the search form to change the number of Giphy images displayed (the `limit` search param)
  - Map over a `const LIMITS = [6, 12, 18, 24, 30]` constant to generate the `<option value={limit}>` tags within the `<select>`
  - The props should be `<select value={searchLimit} onChange={(e) => { ... }}>`
  - The default should remain `6`
- Open the Developer Tools, on the Elements tab, and monitor how the markup changes when changing limits

## 🧠 Elaboration & Feedback

After you're done with the exercise and before jumping to the next step, please fill out the [elaboration & feedback form](https://docs.google.com/forms/d/e/1FAIpQLScRocWvtbrl4XmT5_NRiE8bSK3CMZil-ZQByBAt8lpsurcRmw/viewform?usp=pp_url&entry.1671251225=React+FUNdamentals+Workshop&entry.1984987236=Step+4+-+Lists)

## 👉🏾 Next Step

Go to [Step 5 - Form Submit](../05-form-submit/).

## 📕 Resources

- [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
- [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)
- [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## ❓ Questions

Got questions? Need further clarification? Feel free to post a question in [Ben Ilegbodu's AMA](http://www.benmvp.com/ama/)!
