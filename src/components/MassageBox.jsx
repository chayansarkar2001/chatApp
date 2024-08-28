import React, { useEffect, useRef } from 'react'
import useGlobalContext from '../context.js/GlobalContextProvider'
import Modal from './Modal'

const MassageBox = ({ props }) => {
    const { currId, CHATS } = useGlobalContext()
    const msgBoxRef = useRef(null)

    useEffect(() => {
        if (msgBoxRef.current) {
            msgBoxRef.current.scrollTop = msgBoxRef.current.scrollHeight;
        }
    }, [CHATS])

    return (
        <div className="msgBox customScrollBar" ref={msgBoxRef}>

            {CHATS[currId] && CHATS[currId].map((msg, i) => {
                return <div key={i} className={`msg ${msg.sender == currId ? "" : "flexEnd"}`}>
                    {msg.contend}
                </div>
            })}

        </div>
    )
}

export default MassageBox