import React, { useState, useEffect } from 'react'
import { getResults } from './api'

const LIMITS = [6, 12, 18, 24, 30]

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchLimit, setSearchLimit] = useState(12)
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiResponse = await getResults({
          searchQuery: inputValue,
          limit: searchLimit,
        })

        setResults(apiResponse.results)
      } catch (err) {
        console.error(err)
      }
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
