import { useState, useEffect, useReducer } from 'react'
import { getResults } from './api'

/**
 * @typedef {import('./api').SearchParams} SearchParams
 * @typedef {import('./api').GiphyResult} GiphyResult
 * @typedef {'idle' | 'pending' | 'resolved' | 'rejected'} Status The status of the data
 *
 * @typedef State
 * @property {Status} status
 * @property {GiphyResult[]} results
 * @property {Error} error
 *
 * @typedef Action
 * @property {'started' | 'success' | 'error'} type
 * @property {GiphyResult[]} [results]
 * @property {Error} [error]
 */

/**
 * @type {State}
 */
const INITIAL_STATE = {
  status: 'idle',
  results: [],
  error: null,
}

/**
 * Returns an updated version of `state` based on the `action`
 * @param {State} state Current state
 * @param {Action} action Action to update state
 * @returns {State} Updated state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'started': {
      return {
        ...state,
        status: 'pending',
      }
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        results: action.results,
      }
    }
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
      }
    }
    default: {
      // In case we mis-type an action!
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

/**
 * @callback SetSearchParams
 * @param {SearchParams} searchParams Search parameters
 */

/**
 * A custom hook that returns giphy results and a function to search for updated results
 * @returns {[State, SetSearchParams]}
 */
const useGiphy = () => {
  const [searchParams, setSearchParams] = useState({})
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        dispatch({ type: 'started' })

        const apiResults = await getResults(searchParams)

        dispatch({ type: 'success', results: apiResults })
      } catch (err) {
        dispatch({ type: 'error', error: err })
      }
    }

    fetchResults()
  }, [searchParams])

  return [state, setSearchParams]
}

export default useGiphy
