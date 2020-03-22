import React, { Fragment, useState, useEffect } from 'react'
import { getResults } from './api'

const RATINGS = [
  { value: '', label: 'All' },
  { value: 'g', label: 'G' },
  { value: 'pg', label: 'PG' },
  { value: 'pg-13', label: 'PG-13' },
  { value: 'r', label: 'R' },
]
const LIMITS = [6, 12, 18, 24, 30]

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showInstant, setShowInstant] = useState(false)
  const [searchRating, setSearchRating] = useState('')
  const [searchLimit, setSearchLimit] = useState(12)
  const realSearchQuery = showInstant ? inputValue : searchQuery
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiResponse = await getResults({
          searchQuery: realSearchQuery,
          limit: searchLimit,
          rating: searchRating,
        })

        setResults(apiResponse.results)
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [realSearchQuery, searchRating, searchLimit])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(inputValue)
  }

  return (
    <main>
      <h1>Giphy Search!</h1>

      <form onSubmit={handleSubmit}>
        <section className="input-group">
          <input
            type="search"
            placeholder="Search Giphy"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            className="input-group-field"
          />
          <aside className="input-group-button">
            <button type="submit" className="button">
              Search
            </button>
          </aside>
        </section>
        <section>
          <input
            type="checkbox"
            id="instant-results"
            name="instant-results"
            checked={showInstant}
            onChange={(e) => {
              setShowInstant(e.target.checked)
            }}
          />
          <label htmlFor="instant-results">Show instant results?</label>
        </section>
        <hr />
        <fieldset>
          <legend>Choose a rating</legend>
          {RATINGS.map(({ value, label }) => (
            <Fragment key={value}>
              <input
                type="radio"
                name="rating"
                value={value}
                id={`rating-${value}`}
                checked={value === searchRating}
                onChange={() => {
                  setSearchRating(value)
                }}
              />
              <label htmlFor={`rating-${value}`}>{label}</label>
            </Fragment>
          ))}
        </fieldset>
        <hr />
        <label>
          # of Results
          <select
            onChange={(e) => setSearchLimit(e.target.value)}
            value={searchLimit}
          >
            {LIMITS.map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </label>
      </form>

      {results.length > 0 && (
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
                <h5>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>{' '}
                  ({item.rating})
                </h5>
              </section>
            </section>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
