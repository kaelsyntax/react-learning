function ResultsContext({ eyebrow, title }) {
  return (
    <div className="results-context" role="status" aria-live="polite">
      <p className="results-context__eyebrow">{eyebrow}</p>
      <h2 className="results-context__title">{title}</h2>
    </div>
  )
}

export default ResultsContext
