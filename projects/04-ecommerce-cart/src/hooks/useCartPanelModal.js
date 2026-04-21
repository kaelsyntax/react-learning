import { useCallback, useEffect, useRef, useState } from 'react'

const CLOSE_ANIMATION_MS = 220
const TOGGLE_FADE_MS = 120
const DESKTOP_MEDIA_QUERY = '(min-width: 761px)'

function getFocusableElements(container) {
  if (!container) return []

  return [
    ...container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ].filter(
    (element) =>
      !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true'
  )
}

function useCartPanelModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isPreparingOpen, setIsPreparingOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isDesktopViewport, setIsDesktopViewport] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false
    }

    return window.matchMedia(DESKTOP_MEDIA_QUERY).matches
  })
  const floatingToggleRef = useRef(null)
  const closeButtonRef = useRef(null)
  const modalRef = useRef(null)
  const wasOpenRef = useRef(false)
  const closeTimerRef = useRef(null)
  const openTimerRef = useRef(null)

  const openCart = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }

    wasOpenRef.current = true
    setIsClosing(false)
    setIsOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    if (!isOpen || isClosing) return

    setIsClosing(true)
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      closeTimerRef.current = null
    }, CLOSE_ANIMATION_MS)
  }, [isOpen, isClosing])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)

    function handleMediaQueryChange(event) {
      setIsDesktopViewport(event.matches)
    }

    setIsDesktopViewport(mediaQuery.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMediaQueryChange)
      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }

    mediaQuery.addListener(handleMediaQueryChange)
    return () => mediaQuery.removeListener(handleMediaQueryChange)
  }, [])

  useEffect(() => {
    const pinTarget = document.querySelector('.catalog-header')
    if (!pinTarget) return undefined

    if (typeof IntersectionObserver !== 'function') {
      function handleScrollFallback() {
        const nextPinned = window.scrollY > 100
        setIsPinned(nextPinned)
      }

      handleScrollFallback()
      window.addEventListener('scroll', handleScrollFallback, { passive: true })
      return () => window.removeEventListener('scroll', handleScrollFallback)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPinned(!entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-10px 0px 0px 0px' }
    )

    observer.observe(pinTarget)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isOpen && !isClosing) {
      requestAnimationFrame(() => closeButtonRef.current?.focus())
      return
    }

    if (wasOpenRef.current) {
      if (isDesktopViewport || isPinned) {
        floatingToggleRef.current?.focus()
      }
      wasOpenRef.current = false
    }
  }, [isOpen, isClosing, isPinned, isDesktopViewport])

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current)
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeCart()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeCart])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [isOpen])

  function handleDialogKeyDown(event) {
    if (isClosing) return
    if (event.key !== 'Tab') return

    const focusableElements = getFocusableElements(modalRef.current)
    if (!focusableElements.length) {
      event.preventDefault()
      modalRef.current?.focus()
      return
    }

    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]
    const activeElement = document.activeElement

    if (event.shiftKey) {
      if (activeElement === firstFocusable || !modalRef.current?.contains(activeElement)) {
        event.preventDefault()
        lastFocusable.focus()
      }
      return
    }

    if (activeElement === lastFocusable) {
      event.preventDefault()
      firstFocusable.focus()
    }
  }

  function handleOpenCart() {
    if (isOpen || isClosing || isPreparingOpen) return

    setIsPreparingOpen(true)
    openTimerRef.current = setTimeout(() => {
      setIsPreparingOpen(false)
      openCart()
      openTimerRef.current = null
    }, TOGGLE_FADE_MS)
  }

  const isToggleVisible = isDesktopViewport || isPinned
  const isToggleHiddenForModal = isPreparingOpen || isOpen

  return {
    isOpen,
    isClosing,
    floatingToggleRef,
    closeButtonRef,
    modalRef,
    isToggleVisible,
    isToggleHiddenForModal,
    handleDialogKeyDown,
    handleOpenCart,
    closeCart
  }
}

export { useCartPanelModal }
