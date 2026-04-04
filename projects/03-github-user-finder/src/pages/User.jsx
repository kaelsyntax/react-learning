import { useDebounce } from '../hooks/useDebounce'
import { useFetchUser } from '../hooks/useFetchUser'

function User({ username, navigate }) {
    const debouncedUsername = useDebounce(username, 500)
    const { user, isLoading, error } = useFetchUser(debouncedUsername)

    const isDebouncing = username !== debouncedUsername
    const showLoading = isDebouncing || isLoading
    const isSuccess = Boolean(user) && !showLoading && !error

    function handleSearchAnotherUser() {
        navigate('/')
    }

    return (
        <main className="app">
        <section className="card card--user">
            <p className="eyebrow">User Result</p>
            <h1>GitHub User Finder</h1>

            <p className="description">
            {showLoading ? (
                <>Looking up <strong>@{username}</strong></>
            ) : (
                <>Showing result for <strong>@{username}</strong></>
            )}
            </p>

            {showLoading && (
            <>
                <p className="sr-only" role="status" aria-live="polite">
                Loading profile...
                </p>
                <article className="user-profile user-profile--skeleton" aria-hidden="true">
                <div className="user-avatar skeleton-box"></div>

                <div className="user-info">
                <header className="user-top">
                    <div className="skeleton-pill"></div>
                    <div className="skeleton-line skeleton-line--title"></div>
                    <div className="skeleton-line skeleton-line--handle"></div>
                </header>

                <div className="skeleton-line skeleton-line--bio"></div>

                <div className="user-stats user-stats--skeleton">
                    <p>
                    <span className="skeleton-line skeleton-line--stat-number"></span>
                    <span className="skeleton-line skeleton-line--stat-label"></span>
                    </p>
                    <p>
                    <span className="skeleton-line skeleton-line--stat-number"></span>
                    <span className="skeleton-line skeleton-line--stat-label"></span>
                    </p>
                    <p>
                    <span className="skeleton-line skeleton-line--stat-number"></span>
                    <span className="skeleton-line skeleton-line--stat-label"></span>
                    </p>
                </div>

                <div className="skeleton-line skeleton-line--button"></div>
                </div>
                </article>
            </>
            )}

            {error && (
            <>
                <p className="status status--error">{error}</p>
                <div className="user-actions">
                <button
                    type="button"
                    className="user-link user-link--ghost"
                    onClick={handleSearchAnotherUser}
                >
                    Search another user
                </button>
                </div>
            </>
            )}

            {isSuccess && (
            <article className="user-profile">
                <img
                className="user-avatar"
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                />

                <div className="user-info">
                <header className="user-top">
                    <div className="user-found-slot" aria-live="polite">
                    <p
                        key={debouncedUsername}
                        className="status status--success user-found user-found--auto"
                    >
                        User found
                    </p>
                    </div>

                    <div className="user-identity">
                    <h2 className="user-name">{user.name || user.login}</h2>
                    <p className="user-handle">@{user.login}</p>
                    </div>
                </header>

                <p className="user-bio">{user.bio ?? 'No bio available.'}</p>

                <div className="user-stats">
                    <p><strong>{user.followers}</strong> Followers</p>
                    <p><strong>{user.following}</strong> Following</p>
                    <p><strong>{user.public_repos}</strong> Repos</p>
                </div>

                {user.location && (
                    <p className="user-location">Location: {user.location}</p>
                )}

                <div className="user-actions">
                    <a
                    className="user-link"
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    >
                    View GitHub Profile
                    </a>

                    <button
                    type="button"
                    className="user-link user-link--ghost"
                    onClick={handleSearchAnotherUser}
                    >
                    Search another user
                    </button>
                </div>
                </div>
            </article>
            )}
        </section>
        </main>
    )
}

export default User
