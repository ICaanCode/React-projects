// Remember that the only values allowed as properties without brackets are strings. For numbers, booleans, functions, HTML elements, arrays... use brackets

import React from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

// You can send multiple props inside an object, and then use an spread operator where component properties are specified.
// const carter = { userName: "icaancode" }

// When rendering from an array, you should specify an unique identifier (key) for each element, you should be shure of two things: that this key is really unique and that it will remain the same during the whole execution. Keys are about unique properties, not random properties.

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Ángel Duran',
        isFollowing: true
    },
    {
        userName: 'icaancode',
        name: 'Carlos Andrés Terán',
        isFollowing: true
    },
    {
        userName: 'pheralb',
        name: 'Pablo Heraldo',
        isFollowing: false
    }
]

export function App() {
    return (
        <section className='followCard'>
            {
                users.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        initialIsFollowing={isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}