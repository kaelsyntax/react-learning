import { useEffect, useRef, useState } from 'react'

const STEPPER_FEEDBACK_MS = 220
const STEPPER_AUTO_COLLAPSE_MS = 2000

function useProductCardStepper({
  product,
  isOutOfStock,
  isAtStockLimit,
  inCartQuantity,
  onIncreaseQuantity,
  onDecreaseQuantity
}) {
  const [stepperFeedback, setStepperFeedback] = useState('')
  const [isStepperCollapsed, setIsStepperCollapsed] = useState(false)
  const [isStepperFocused, setIsStepperFocused] = useState(false)
  const [stepperInteractionToken, setStepperInteractionToken] = useState(0)
  const feedbackTimerRef = useRef(null)

  const canIncreaseQuantity = !isOutOfStock && !isAtStockLimit
  const canShowQuantityStepper = isOutOfStock || inCartQuantity > 0
  const effectiveIsStepperCollapsed = isOutOfStock ? false : isStepperCollapsed
  const shouldShowQuantityStepper = canShowQuantityStepper && !effectiveIsStepperCollapsed
  const blockedIncreaseReason = !canIncreaseQuantity
    ? isOutOfStock
      ? 'No stock available'
      : 'Stock limit reached'
    : ''

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const shouldAutoCollapse =
      inCartQuantity > 0 && !isOutOfStock && !isStepperCollapsed && !isStepperFocused
    if (!shouldAutoCollapse) return undefined

    const timeoutId = setTimeout(() => {
      setIsStepperCollapsed(true)
    }, STEPPER_AUTO_COLLAPSE_MS)

    return () => clearTimeout(timeoutId)
  }, [inCartQuantity, isOutOfStock, isStepperCollapsed, isStepperFocused, stepperInteractionToken])

  function markStepperInteraction() {
    setIsStepperCollapsed(false)
    setStepperInteractionToken((current) => current + 1)
  }

  function handleStepperFocus() {
    setIsStepperFocused(true)
    markStepperInteraction()
  }

  function handleStepperBlur() {
    setIsStepperFocused(false)
    setStepperInteractionToken((current) => current + 1)
  }

  function triggerStepperFeedback(type) {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current)
    }

    setStepperFeedback(type)
    feedbackTimerRef.current = setTimeout(() => {
      setStepperFeedback('')
      feedbackTimerRef.current = null
    }, STEPPER_FEEDBACK_MS)
  }

  function handleIncrease() {
    markStepperInteraction()

    if (!canIncreaseQuantity) {
      triggerStepperFeedback('blocked-plus')
      return
    }

    triggerStepperFeedback('plus')
    onIncreaseQuantity(product)
  }

  function handleDecrease() {
    markStepperInteraction()

    if (inCartQuantity === 0) return

    triggerStepperFeedback('minus')
    onDecreaseQuantity(product.id)
  }

  return {
    stepperFeedback,
    canIncreaseQuantity,
    canShowQuantityStepper,
    shouldShowQuantityStepper,
    blockedIncreaseReason,
    handleIncrease,
    handleDecrease,
    handleStepperFocus,
    handleStepperBlur
  }
}

export { useProductCardStepper }
