import React from 'react'
import PropTypes from 'prop-types'
import ResultsItem from './ResultsItem'

const Results = ({ items, status }) => {
  const isLoading = status === 'idle' || status === 'pending'
  const isRejected = status === 'rejected'
  let message

  if (isLoading) {
    message = (
      <section className="callout warning text-center">
        <p className="h3">Loading new results...</p>
      </section>
    )
  } else if (isRejected) {
    message = (
      <section className="callout alert text-center">
        <p className="h4">
          There was an error retrieving results. Please try again.
        </p>
      </section>
    )
  }

  return (
    <>
      {message}
      {items.length > 0 && (
        <section className="callout primary">
          {items.map((item) => (
            <ResultsItem
              key={item.id}
              id={item.id}
              title={item.title}
              url={item.url}
              rating={item.rating}
              previewUrl={item.previewUrl}
            />
          ))}
        </section>
      )}
    </>
  )
}

Results.propTypes = {
  error: PropTypes.instanceOf(Error),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      rating: PropTypes.oneOf(['G', 'PG', 'PG-13', 'R']).isRequired,
      previewUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
  status: PropTypes.oneOf(['idle', 'pending', 'resolved', 'rejected'])
    .isRequired,
}

export default Results
