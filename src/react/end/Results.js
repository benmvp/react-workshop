import React from 'react'
import PropTypes from 'prop-types'
import ResultsItem from './ResultsItem'

const Results = ({ items }) => {
  return (
    items.length > 0 && (
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
    )
  )
}

Results.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      rating: PropTypes.oneOf(['G', 'PG', 'PG-13', 'R']).isRequired,
      previewUrl: PropTypes.string.isRequired,
    }).isRequired,
  ),
}

export default Results
