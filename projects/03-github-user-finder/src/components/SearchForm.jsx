import { useState } from 'react'

function SearchForm({ onSearch }) {
    const [search, setSearch] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        const trimmed = search.trim()
        if (!trimmed) return

        onSearch(trimmed)
        setSearch('')
    }

    const isEmpty = !search.trim()

    return (
        <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-row">
            <label className="sr-only" htmlFor="search">GitHub username</label>

            <div className="search-input-wrap">
                <input
                    id="search"
                    className="search-input"
                    type="text"
                    placeholder="Search GitHub username..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>

            <button
                className="search-button"
                type="submit"
                disabled={isEmpty}
            >
                Search
            </button>
        </div>

        <p className="search-hint">Try: `gaearon`, `torvalds`, `yyx990803`</p>
        </form>
    )
}

export default SearchForm
