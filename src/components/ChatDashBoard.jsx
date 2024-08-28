import React, { useEffect, useRef } from 'react'
import socket from '../socket'
import useGlobalContext from '../context.js/GlobalContextProvider'
import People from './People'
import MassageBox from './MassageBox'
import sendIcon from "../assets/sendbutton.svg"
import backIcon from "../assets/backbutton.svg"
import Modal from './Modal'

const ChatDashBoard = () => {
    const { currId, setCurrId, CHATS, setCHATS, userList, userDetails, ptcRef } = useGlobalContext()

    // console.log("props:", { currId, setCurrId, messages, setMessages, userList })

    const msgInputRef = useRef(null)


    const handleSend = (e) => {
        e.preventDefault()
        let msg = msgInputRef.current.value;
        if (msg == "") return
        msg = { "sender": userDetails.contact, "reciver": currId, "contend": msg }
        console.log("send:", { "sendTo": currId, "msg": msg, "contact": userDetails.contact })
        socket.emit("msg:sendTo", { "sendTo": currId, "msg": msg, "contact": userDetails.contact })
        setCHATS((CHATS) => {
            const newCHATS = { ...CHATS }
            if (!(currId in newCHATS)) { newCHATS[currId] = [] }
            console.log("newCHATS:", newCHATS)
            newCHATS[currId].push(msg)
            console.log("after send, newCHATS:", newCHATS)
            return newCHATS
        })
        msgInputRef.current.value = ""
        msgInputRef.current.dispatchEvent(new Event('input'))
    }
    const handleBackBtn = () => {
        setCurrId(null)
        ptcRef.current.style.display = "flex"
    }

    const handleTextAreaChange = (e) => {
        e.target.style.height = "auto"
        e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`
    }

    return (
        <div className='outer'>
            <div className='dashboard'>
                <div className="damborder"></div>
                <div ref={ptcRef} className='peopleTopContainer'>
                    <div className='heading'><span>People</span></div>
                    <div className="peopleMainContainer customScrollBar">
                        {Object.keys(userList).map((val) => {
                            return <People key={val} val={val} />
                        })}
                    </div>
                </div>

                {(currId != null) ?
                    <div className="chatContainer">
                        <div className={`peopleContainer`}>
                            <div className='backBtn' onClick={handleBackBtn}><img src={backIcon} alt="<-" /></div>
                            <div className="userImage"></div>
                            <div className="nameContainer">
                                <span className='name'>{`${userList[currId].userName}`}</span>
                            </div>
                        </div>

                        <MassageBox />

                        <form className="msgInputContainer">
                            <textarea onChange={handleTextAreaChange} ref={msgInputRef} rows={1}
                                type="text" className='msgInput customScrollBar'
                                placeholder='  Type a message'></textarea>
                            <div className="sendBtn" onClick={handleSend}><img alt=">" src={sendIcon} /></div>
                        </form>
                    </div> : <div className="titleMsg">Chat with your friends</div>
                }
            </div>
            <Modal />
        </div>
    )
}

export default ChatDashBoard