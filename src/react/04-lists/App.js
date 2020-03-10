import React, { useState, useEffect } from 'react'
import { getResults } from './api'

const LIMITS = [5, 10, 15, 20, 25]

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchLimit, setSearchLimit] = useState(10)
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      setResults(
        await getResults({ searchQuery: inputValue, limit: searchLimit }),
      )
    }

    fetchResults()
  }, [inputValue, searchLimit])

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
          {results.map((result) => (
            <section
              key={result.id}
              className="card"
              style={{
                width: '300px',
                display: 'inline-block',
                marginRight: '16px',
              }}
            >
              <img src={result.imageUrl} alt={result.imageUrl} />
              <section className="card-section">
                <h5>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {result.title}
                  </a>{' '}
                  ({result.rating})
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
