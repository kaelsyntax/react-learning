import './App.css'

function App() {
  return (
    <main className="app">
      <section className="card">
        <p className="eyebrow">Section 04</p>
        <h1>Ecommerce Cart</h1>
        <p className="description">
          Base scaffold ready. We will build product listing, filters, and
          global cart state step by step.
        </p>

        <section className="next-steps" aria-label="Next steps">
          <h2>Next Steps</h2>
          <ul>
            <li>Define products data shape</li>
            <li>Model filter state</li>
            <li>Build cart architecture with Context and Reducer</li>
          </ul>
        </section>
      </section>
    </main>
  )
}

export default App
