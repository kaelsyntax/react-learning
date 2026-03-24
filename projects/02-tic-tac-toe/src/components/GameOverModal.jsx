import { useEffect, useId, useRef } from 'react'

function GameOverModal({ winner, onReset, isClosing }) {
    const titleId = useId()
    const descriptionId = useId()
    const modalContentRef = useRef(null)
    const resetButtonRef = useRef(null)

    useEffect(() => {
        if (!isClosing) {
        resetButtonRef.current?.focus()
        }
    }, [isClosing])

    function handleTrapFocus(event) {
        if (event.key !== 'Tab') return

        const focusable = modalContentRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (!focusable || focusable.length === 0) {
        event.preventDefault()
        return
        }

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const activeElement = document.activeElement

        if (event.shiftKey && activeElement === first) {
        event.preventDefault()
        last.focus()
        } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault()
        first.focus()
        }
    }

    const modalVariant = winner ? `winner-${winner}` : 'draw'

    const title = winner ? `Player ${winner} wins` : "It's a draw"
    const subtitle = winner
        ? 'Great round. Ready for another one?'
        : 'Nobody won this time. Start a new round?'

    return (
        <section className={`modal ${isClosing ? 'closing' : ''}`}>
        <div
            ref={modalContentRef}
            className={`modal-content ${modalVariant} ${isClosing ? 'closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onKeyDown={handleTrapFocus}
        >
            <div className={`modal-badge ${winner ? `winner-${winner}` : 'draw'}`}>
            {winner ? winner : '='}
            </div>

            <p className={`modal-eyebrow ${modalVariant}`}>Round Over</p>
            <h2 id={titleId}>{title}</h2>
            <p id={descriptionId} className="modal-description">
            {subtitle}
            </p>

            <button ref={resetButtonRef} type="button" onClick={onReset}>
            Start new round
            </button>
        </div>
        </section>
    )
}

export default GameOverModal
