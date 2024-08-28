import React, { useRef } from 'react'
import useGlobalContext from '../context.js/GlobalContextProvider'

function Login() {
    const { setUserDetails } = useGlobalContext()

    const contactRef = useRef(null)
    const userNameRef = useRef(null)

    const handleUserDetailsSubmit = (e) => {
        setUserDetails({
            contact: contactRef.current.value,
            userName: userNameRef.current.value || contact
        })
    }
    return (
        <div className="outer">
            <div className="loginContainer">
                <form onSubmit={handleUserDetailsSubmit} action='http://localhost:5173/#' method='POST'>
                    <input type="text" ref={contactRef} placeholder='  Enter your contact...' required={true} />
                    <input type="text" ref={userNameRef} placeholder='  Enter your name...' />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login