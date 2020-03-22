import { useState, useEffect } from 'react'
import { getResults } from './api'

/**
 * @typedef {import('./api').SearchParams} SearchParams
 * @typedef {import('./api').GiphyResult} GiphyResult
 *
 * @callback SetSearchParams
 * @param {SearchParams} searchParams Search parameters
 */

/**
 * A custom hook that returns giphy results and a function to search for updated results
 * @returns {[GiphyResult[], SetSearchParams]}
 */
const useGiphy = () => {
  const [searchParams, setSearchParams] = useState({})
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiResponse = await getResults(searchParams)

        setResults(apiResponse.results)
      } catch (err) {
        console.error(err)
      }
    }

    fetchResults()
  }, [searchParams])

  return [results, setSearchParams]
}

export default useGiphy
