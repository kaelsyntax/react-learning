import { useEffect, useId, useMemo, useRef, useState } from 'react'

function CategoryFilter({ categories, value, onChange, formatCategoryLabel }) {
  const categoryLabelId = useId()
  const categoryTriggerId = useId()
  const categoryListboxId = useId()
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const selectWrapRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])

  const selectedIndex = useMemo(() => {
    const index = categories.findIndex((category) => category === value)
    return index < 0 ? 0 : index
  }, [categories, value])

  useEffect(() => {
    if (!isSelectOpen) return undefined

    function handlePointerDown(event) {
      if (!selectWrapRef.current?.contains(event.target)) {
        setIsSelectOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [isSelectOpen])

  useEffect(() => {
    if (!isSelectOpen) return
    setActiveIndex(selectedIndex)
  }, [isSelectOpen, selectedIndex])

  useEffect(() => {
    if (!isSelectOpen) return
    const activeOption = optionRefs.current[activeIndex]
    activeOption?.focus()
  }, [activeIndex, isSelectOpen])

  function toggleSelect() {
    setIsSelectOpen((previous) => !previous)
  }

  function closeSelectAndFocusTrigger() {
    setIsSelectOpen(false)
    triggerRef.current?.focus()
  }

  function handleTriggerKeyDown(event) {
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault()
      setIsSelectOpen(true)
      setActiveIndex(selectedIndex)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsSelectOpen(false)
    }
  }

  function handleOptionKeyDown(event, index) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index + 1) % categories.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index - 1 + categories.length) % categories.length)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      setActiveIndex(categories.length - 1)
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeSelectAndFocusTrigger()
      return
    }

    if (event.key === 'Tab') {
      setIsSelectOpen(false)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect(categories[index])
    }
  }

  function handleSelect(category) {
    onChange(category)
    setIsSelectOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div
      className={`filter-field filter-field--select ${isSelectOpen ? 'filter-field--open' : ''}`}
    >
      <span id={categoryLabelId}>Category</span>

      <div className="select-wrap" ref={selectWrapRef}>
        <button
          id={categoryTriggerId}
          ref={triggerRef}
          className="filter-select filter-select--custom"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isSelectOpen}
          aria-controls={categoryListboxId}
          aria-labelledby={`${categoryLabelId} ${categoryTriggerId}`}
          onClick={toggleSelect}
          onKeyDown={handleTriggerKeyDown}
        >
          {formatCategoryLabel(value)}
        </button>

        {isSelectOpen && (
          <ul
            id={categoryListboxId}
            className="filter-select-menu"
            role="listbox"
            aria-labelledby={categoryLabelId}
          >
            {categories.map((category, index) => (
              <li key={category} role="presentation">
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element
                  }}
                  type="button"
                  role="option"
                  aria-selected={category === value}
                  className={`filter-select-option ${category === value ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(category)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                >
                  {formatCategoryLabel(category)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CategoryFilter
