import { useEffect, useState } from 'react'

export function useFetchUser(username) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!username) {
        setUser(null)
        setError(null)
        setIsLoading(false)
        return
        }

        const controller = new AbortController()
        const signal = controller.signal

        async function fetchUser() {
        setIsLoading(true)
        setError(null)
        setUser(null)

        try {
            const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}`,
            { signal }
            )

            if (response.status === 404) {
            throw new Error('User not found')
            }

            if (!response.ok) {
            throw new Error('Something went wrong while fetching the profile')
            }

            const data = await response.json()
            setUser(data)
        } catch (err) {
            if (err.name === 'AbortError') return

            setUser(null)
            setError(err.message)
        } finally {
            if (!signal.aborted) {
            setIsLoading(false)
            }
        }
        }

        fetchUser()

        return () => controller.abort()
    }, [username])

    return { user, isLoading, error }
}