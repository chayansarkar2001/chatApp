import { useContext, useState, createContext, useEffect, useRef } from 'react';
import socket from '../socket';

const GlobalContext = createContext();

const GlobalContextProvider = ({ childComponent }) => {

    // const [userList, setUserList] = useState({
    //     "1": { "userName": "User1", "socketId": "1233" },
    //     "2": { "userName": "User2", "socketId": "3534" }
    // })
    const [userList, setUserList] = useState({})
    const [userDetails, setUserDetails] = useState(null)
    const [showModal, setShowModal] = useState({ show: false, info: "" })
    const [currId, setCurrId] = useState(null)
    const [CHATS, setCHATS] = useState({})
    // const [CHATS, setCHATS] = useState({
    //     "1": [
    //         { "sender": "1", "reciver": "2", "contend": "new msg" },
    //         { "sender": "2", "reciver": "1", "contend": "new msg" }
    //     ]
    // })
    const ptcRef = useRef(null)

    useEffect(() => {
        // first get the username

        if (!userDetails) return
        console.log("submited userDetails:", userDetails)
        // build socket connection
        socket.connect()

        // emit join request
        setShowModal({ "show": true, "info": "wait a secend. fetching your contact" })
        socket.emit("join", { userDetails })

        // clean up function
        return () => {
            socket.disconnect()
        }
    }, [userDetails])

    useEffect(() => {
        const handleNewUser = ({ newUserList }) => {
            console.log("Get new userList from backend:", newUserList)
            if (newUserList)
                setUserList(newUserList) // {"234":{"socketId":socket.id,userName:"chayan"}}
            else
                console.log("new user list from backend is empty")
            setShowModal({ show: false, info: "" })
        }

        const handleMsgRecive = ({ reciveFrom, msg }) => {
            console.log("recive msg:", { msg, reciveFrom })
            setCHATS((CHATS) => {
                const newCHATS = { ...CHATS }
                if (!(reciveFrom in newCHATS)) { newCHATS[reciveFrom] = [] }
                newCHATS[reciveFrom].push(msg)
                console.log("afterrecive, newCHATS:", newCHATS)
                return newCHATS
            })
        }

        const handleFetchMsg = ({ chat, chatWith }) => {
            console.log("fetching:", { chat, chatWith })
            setCHATS((CHATS) => {
                const newCHATS = { ...CHATS }
                if (!(chatWith in newCHATS)) { newCHATS[chatWith] = [] }
                newCHATS[chatWith].push(...chat)
                console.log("after fetch, newCHATS:", newCHATS)
                return newCHATS
            })
            setShowModal({ show: false, info: "" })
        }

        // update with the new user list recive from server
        socket.on("join", handleNewUser)

        // get old msgs for the contact
        socket.on("msg:fetchMsg", handleFetchMsg)

        // recive msg from other socket/user
        socket.on("msg:reciveFrom", handleMsgRecive)

        // clean up function
        return () => {
            socket.off("userList", handleNewUser)
            socket.off("msg:reciveFrom", handleMsgRecive)
            socket.off("msg:fetchMsg", handleFetchMsg)
        }

    }, [userList])


    return <GlobalContext.Provider value={{
        userList, setUserList,
        userDetails, setUserDetails,
        currId, setCurrId,
        CHATS, setCHATS,
        showModal, setShowModal,
        ptcRef
    }}>
        {childComponent}
    </GlobalContext.Provider>
}

const useGlobalContext = () => {
    return useContext(GlobalContext)
}

export { GlobalContextProvider }
export default useGlobalContext