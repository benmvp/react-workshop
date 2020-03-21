import React from 'react'
import PropTypes from 'prop-types'

const ResultsItem = ({ id, title, url, rating, previewUrl }) => {
  return (
    <section
      key={id}
      className="card"
      style={{
        width: '300px',
        display: 'inline-block',
        marginRight: '16px',
      }}
    >
      <video src={previewUrl} alt={title} loop autoPlay />
      <section className="card-section">
        <h5>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>{' '}
          ({rating})
        </h5>
      </section>
    </section>
  )
}

ResultsItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.oneOf(['G', 'PG', 'PG-13', 'R']).isRequired,
  previewUrl: PropTypes.string.isRequired,
}

export default ResultsItem
