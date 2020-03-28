import React, { useState, useEffect } from 'react'
import { getResults } from './api'
import Results from './Results'
import SearchForm from './SearchForm'

const App = () => {
  const [formValues, setFormValues] = useState({})
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiResponse = await getResults(formValues)

        setResults(apiResponse.results)
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [formValues])

  return (
    <main>
      <h1>Giphy Search!</h1>

      <SearchForm onChange={setFormValues} />
      <Results items={results} />
    </main>
  )
}

export default App
