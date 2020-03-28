import React from 'react'
import useGiphy from './useGiphy'
import Results from './Results'
import SearchForm from './SearchForm'

const App = () => {
  const [results, setSearchParams] = useGiphy()

  return (
    <main>
      <h1>Giphy Search!</h1>

      <SearchForm
        onChange={setSearchParams}
        initialSearchQuery="friend"
        initialLimit={24}
      />
      <Results items={results} />
    </main>
  )
}

export default App
