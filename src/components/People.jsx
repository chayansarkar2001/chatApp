import React, { useEffect, useState } from 'react'
import useGlobalContext from '../context.js/GlobalContextProvider'
import socket from '../socket'

function People({ val }) {

    const { currId, setCurrId, setShowModal, userList, CHATS, userDetails, ptcRef } = useGlobalContext()

    const handlePeopleSelect = (e) => {
        e.preventDefault()
        const uid = e.currentTarget.id
        if (uid == -1) return
        if (!(uid in CHATS)) {
            console.log("user selected from People:", { "contact": userDetails.contact, "chatWith": uid, CHATS })
            setShowModal({ show: true, info: "fetching your old messages" })
            socket.emit("msg:request", { "contact": userDetails.contact, "chatWith": uid })
        }
        setCurrId(uid)
        if (window.innerWidth < 650) {
            ptcRef.current.style.display = "none"
        }
    }


    return (
        <div id={val} className={`peopleContainer ${(currId == val) ? "activePeople" : ""}`} onClick={handlePeopleSelect}>
            <div className="userImage"></div>
            <div className="nameContainer">
                <span className='name'>{`${userList[val].userName}`}</span>
            </div>
        </div>
    )
}

export default People