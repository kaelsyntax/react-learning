import { useState } from 'react'
import { VerifiedBadge } from './VerifiedBadge'

const formatUserName = (value) => value.toLowerCase().replace(/\s+/g, '')
const addAt = (value) => `@${value}`
const getPrimaryAvatarUrl = (seed) => `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}`
const getFallbackAvatarUrl = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1d9bf0&color=ffffff&bold=true`

export function TwitterFollowCard ({
    userName,
    name,
    initialIsFollowing = false,
    isVerified,
    followsYou
}) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    const [isHoverReady, setIsHoverReady] = useState(true)

    const normalizedUserName = formatUserName(userName)
    const displayUserName = addAt(normalizedUserName)
    const primaryAvatarUrl = getPrimaryAvatarUrl(normalizedUserName)
    const fallbackAvatarUrl = getFallbackAvatarUrl(name)

    const buttonClasses = [
        'tw-follow-card__button',
        isFollowing
            ? 'tw-follow-card__button--following'
            : 'tw-follow-card__button--not-following',
        isFollowing && isHoverReady && 'tw-follow-card__button--hover-ready'
    ].filter(Boolean).join(' ')

    const handleClick = () => {
        const nextIsFollowing = !isFollowing
        setIsFollowing((prev) => !prev)
        setIsHoverReady(!nextIsFollowing)
    }

    const handleAvatarError = (event) => {
        const image = event.currentTarget
        image.onerror = null
        image.src = fallbackAvatarUrl
    }

    const buttonAriaLabel = isFollowing ? `Unfollow ${name}` : `Follow ${name}`

    return (
        <article className='tw-follow-card'>
            <header className='tw-follow-card__header'>
                <img
                    className='tw-follow-card__avatar'
                    src={primaryAvatarUrl}
                    alt={`${name}'s profile picture`}
                    loading='lazy'
                    decoding='async'
                    onError={handleAvatarError}
                />

                <div className='tw-follow-card__info'>
                    <strong className='tw-follow-card__name'>
                        {name}
                        {isVerified && <VerifiedBadge />}
                    </strong>

                    <div className='tw-follow-card__meta'>
                        <span className='tw-follow-card__user'>{displayUserName}</span>

                        {followsYou && (
                            <span className='tw-follow-card__follows-you'>
                                Follows you
                            </span>
                        )}
                    </div>
                </div>
            </header>

            <aside className='tw-follow-card__actions'>
                <button
                    type='button'
                    className={buttonClasses}
                    onClick={handleClick}
                    onMouseLeave={() => setIsHoverReady(true)}
                    aria-label={buttonAriaLabel}
                >
                    {isFollowing
                        ? (
                            <>
                                <span className='tw-follow-card__button-label tw-follow-card__button-label--following'>
                                    Following
                                </span>
                                <span className='tw-follow-card__button-label tw-follow-card__button-label--unfollow'>
                                    Unfollow
                                </span>
                            </>
                        )
                        : (
                            <span className='tw-follow-card__button-label'>
                                Follow
                            </span>
                        )}
                </button>
            </aside>
        </article>
    )
}
