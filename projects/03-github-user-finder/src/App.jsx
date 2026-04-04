import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import User from './pages/User'
import NotFound from './pages/NotFound'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    function handleLocationChange() {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationChange)

    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  function navigate(to) {
    if (to === currentPath) return

    window.history.pushState({}, '', to)
    setCurrentPath(to)
  }

  if (currentPath === '/') {
    return <Home navigate={navigate} />
  }

  if (currentPath.startsWith('/user/')) {
    const rawUsername = currentPath.replace('/user/', '')
    const username = decodeURIComponent(rawUsername)

    if (username) {
      return <User username={username} navigate={navigate} />
    }
  }

  return <NotFound />
}

export default App
