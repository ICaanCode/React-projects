// Properties for React Components are immutable, this means those values that come from component declaration shouldn't be altered, they should be preserved as they come. In case of require property value modification, create a new variable and then transform its value, but not component property.

// Children prop is everything inside an element, this way you could access to anything wherever your component is being rendered

// You can assign default values for your props, this way when your component is rendered, you will not get an empty component or an undesired behavior.

// Props to start a state: initial<Name_of_the_prop>

import { useState } from "react";

export function TwitterFollowCard({ children, userName = 'unknown', initialIsFollowing }) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button';

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img
                    className='tw-followCard-avatar'
                    src={`https://unavatar.io/${userName}`}
                    alt="Avatar" />
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}