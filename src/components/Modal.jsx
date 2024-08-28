import React from 'react'
import useGlobalContext from '../context.js/GlobalContextProvider'

const Modal = () => {
    const { showModal } = useGlobalContext()
    if (!showModal.show) return
    return (
        <div className="modalContainer">
            <div className="loadingContainer"></div>
            <p>{showModal.info}</p>
        </div>
    )
}

export default Modal 