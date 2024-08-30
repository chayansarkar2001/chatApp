import './App.css'
import Login from './components/Login';
import ChatDashBoard from './components/ChatDashBoard';
import useGlobalContext from './context.js/GlobalContextProvider';

function App() {
  const { userDetails } = useGlobalContext()

  return (

    (userDetails == null) ? <Login /> : <ChatDashBoard />

  )
}

export default App
