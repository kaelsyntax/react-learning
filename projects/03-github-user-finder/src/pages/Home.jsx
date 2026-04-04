import SearchForm from '../components/SearchForm'

function Home({ navigate }) {
    function handleSearch(value) {
        navigate(`/user/${encodeURIComponent(value)}`)
    }

    return (
        <main className="app">
        <section className="card card--home">
            <p className="eyebrow">Section 03</p>
            <h1>GitHub User Finder</h1>
            <p className="description">
            Search a GitHub username and open a route-based result screen.
            </p>
            <SearchForm onSearch={handleSearch} />
        </section>
        </main>
    )
}

export default Home
