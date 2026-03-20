import './assets/app.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {

    const users = [
        {
            id: 1,
            name: 'Kael',
            userName: 'KaelSyntax100',
            initialIsFollowing: true,
            isVerified: true,
            followsYou: true
        },
        {
            id: 2,
            name: 'Gemma',
            userName: 'Gemma12',
            initialIsFollowing: false,
            isVerified: false,
            followsYou: false
        },
        {
            id: 3,
            name: 'Mike',
            userName: 'mikegr',
            initialIsFollowing: false,
            isVerified: false,
            followsYou: false
        }
    ]

    return (
        <section className='App'>
            {users.map((user) => (
                <TwitterFollowCard
                    key={user.id}
                    initialIsFollowing={user.initialIsFollowing}
                    userName={user.userName}
                    name={user.name}
                    isVerified={user.isVerified}
                    followsYou={user.followsYou}
                />
            ))}
        </section>

    )
}
