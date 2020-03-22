import React from 'react'

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

export default ResultsItem
