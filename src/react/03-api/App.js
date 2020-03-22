import React, { useState, useEffect } from 'react'
import { getResults } from './api'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiResults = await getResults({ searchQuery: inputValue })

        setResults(apiResults)
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [inputValue])

  console.log({ inputValue, results })

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
    </main>
  )
}

export default App
