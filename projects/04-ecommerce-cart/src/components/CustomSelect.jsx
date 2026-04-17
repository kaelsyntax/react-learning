import { useEffect, useId, useMemo, useRef, useState } from 'react'

const MENU_CLOSE_ANIMATION_MS = 160

function CustomSelect({
  label,
  options,
  value,
  onChange,
  formatOptionLabel = (option) => option
}) {
  const labelId = useId()
  const triggerId = useId()
  const listboxId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const selectWrapRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])
  const closeTimeoutRef = useRef(null)

  const selectedIndex = useMemo(() => {
    const index = options.findIndex((option) => option === value)
    return index < 0 ? 0 : index
  }, [options, value])

  useEffect(() => {
    if (!isOpen) return undefined

    function handlePointerDown(event) {
      if (!selectWrapRef.current?.contains(event.target)) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [isOpen])

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    },
    []
  )

  useEffect(() => {
    if (!isOpen) return
    setActiveIndex(selectedIndex)
  }, [isOpen, selectedIndex])

  useEffect(() => {
    if (!isOpen) return
    const activeOption = optionRefs.current[activeIndex]
    activeOption?.focus()
  }, [activeIndex, isOpen])

  function clearCloseTimer() {
    if (!closeTimeoutRef.current) return
    clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = null
  }

  function openMenu() {
    clearCloseTimer()
    setIsClosing(false)
    setIsOpen(true)
    setActiveIndex(selectedIndex)
  }

  function closeMenu({ focusTrigger = false, blurTrigger = false } = {}) {
    clearCloseTimer()
    setIsOpen(false)
    setIsClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      setIsClosing(false)
      closeTimeoutRef.current = null
    }, MENU_CLOSE_ANIMATION_MS)

    if (focusTrigger) {
      triggerRef.current?.focus()
    }

    if (blurTrigger) {
      triggerRef.current?.blur()
    }
  }

  function handleTriggerClick() {
    if (isOpen) {
      closeMenu({ blurTrigger: true })
      return
    }

    openMenu()
  }

  function closeSelectAndFocusTrigger() {
    closeMenu({ focusTrigger: true })
  }

  function handleTriggerKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (isOpen) {
        closeMenu()
      } else {
        openMenu()
      }
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openMenu()
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu()
    }
  }

  function handleOptionKeyDown(event, index) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index + 1) % options.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index - 1 + options.length) % options.length)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      setActiveIndex(options.length - 1)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeSelectAndFocusTrigger()
      return
    }

    if (event.key === 'Tab') {
      closeMenu()
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect(options[index])
    }
  }

  function handleSelect(option) {
    onChange(option)
    closeMenu({ focusTrigger: true })
  }

  const isMenuVisible = isOpen || isClosing

  return (
    <div className={`filter-field filter-field--select ${isOpen ? 'filter-field--open' : ''}`}>
      <span id={labelId}>{label}</span>

      <div className="select-wrap" ref={selectWrapRef}>
        <button
          id={triggerId}
          ref={triggerRef}
          className="filter-select filter-select--custom"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-labelledby={`${labelId} ${triggerId}`}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
        >
          {formatOptionLabel(value)}
        </button>

        {isMenuVisible && (
          <ul
            id={listboxId}
            className={`filter-select-menu ${isClosing ? 'is-closing' : ''}`}
            role="listbox"
            aria-labelledby={labelId}
          >
            {options.map((option, index) => (
              <li key={option} role="presentation">
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element
                  }}
                  type="button"
                  role="option"
                  aria-selected={option === value}
                  className={`filter-select-option ${option === value ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                >
                  {formatOptionLabel(option)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CustomSelect
