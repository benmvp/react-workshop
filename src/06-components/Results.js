import React from 'react'
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

export default Results
