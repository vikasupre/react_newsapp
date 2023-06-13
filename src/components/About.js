import React, { useContext } from 'react'
import { Context } from './context/Mycontext'

export default function About() {
    const C = useContext(Context)
    document.title = 'Newsapp - about'
    return (
        <div className='my-5'>
            <h1 style={{ marginTop: '5rem' }}>This is {C.name}</h1>

        </div>
    )
}
