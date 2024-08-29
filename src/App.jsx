import './App.css'
import Login from './components/Login';
import ChatDashBoard from './components/ChatDashBoard';
import useGlobalContext from './context.js/GlobalContextProvider';
import { useEffect } from 'react';

function App() {
  const { userDetails } = useGlobalContext()

  const setVeiwPortHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    setVeiwPortHeight()
    window.addEventListener("resize", setVeiwPortHeight)
    return () => {
      window.removeEventListener("resize", setVeiwPortHeight)
    }
  }, [])

  return (

    (userDetails == null) ? <Login /> : <ChatDashBoard />

  )
}

export default App
