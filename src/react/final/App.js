import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'

import { getResults } from './api'

import './App.css'

const RATINGS = ['G', 'PG', 'PG-13', 'R']
const LIMITS = [5, 10, 15, 20]

const App = ({
  initialQuery = '',
  initialRating = 'G',
  initialLimit = 10,
  initialUseInstantSearch = false,
}) => {
  const [inputValue, setInputValue] = useState(initialQuery)
  const [searchQuery, setSearchQuery] = useState(inputValue)
  const [searchRating, setSearchRating] = useState(initialRating)
  const [searchLimit, setSearchLimit] = useState(initialLimit)
  const [useInstantSearch, setUseInstantSearch] = useState(
    initialUseInstantSearch,
  )
  const realSearchQuery = useInstantSearch ? inputValue : searchQuery
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchGiphy = async () => {
      setResults(
        await getResults({
          searchQuery: realSearchQuery,
          rating: searchRating,
          limit: searchLimit,
        }),
      )
    }

    fetchGiphy()
  }, [realSearchQuery, searchRating, searchLimit])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(inputValue)
  }

  return (
    <main className="app">
      <h1>Giphy Search!</h1>

      <form onSubmit={handleSubmit}>
        <section className="app__form-field">
          <input
            id="search-query"
            className="app__query-input"
            type="search"
            value={inputValue}
            placeholder="Search Giphy"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Go</button>
        </section>

        <section className="app__form-field">
          {RATINGS.map((rating) => (
            <Fragment key={rating}>
              <input
                id={`search-rating-${rating}`}
                type="radio"
                name="rating"
                value={rating}
                checked={searchRating === rating}
                onChange={() => setSearchRating(rating)}
              />
              <label
                htmlFor={`search-rating-${rating}`}
                className="app__rating-label"
              >
                {rating}
              </label>
            </Fragment>
          ))}
        </section>

        <section className="app__form-field">
          <label htmlFor="search-limit" className="num-results-label">
            # Results
          </label>
          <select
            id="search-limit"
            onChange={(e) => setSearchLimit(e.target.value)}
            value={searchLimit}
          >
            {LIMITS.map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </section>

        <section className="app__form-field">
          <input
            id="instant-search"
            type="checkbox"
            name="instant-search"
            checked={useInstantSearch}
            onChange={(e) => setUseInstantSearch(e.target.checked)}
          />
          <label htmlFor="instant-search" className="instant-search">
            Use instant search
          </label>
        </section>
      </form>

      <section className="app__results-shell">
        <section className="app__results">
          {results.map((result) => (
            <video
              key={result.url}
              src={result.imageUrl}
              className="app__results__item"
              loop
              autoPlay
            />
          ))}
        </section>
      </section>
    </main>
  )
}

App.propTypes = {
  initialSearch: PropTypes.string,
}

export default App
