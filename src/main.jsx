import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GlobalContextProvider } from './context.js/GlobalContextProvider.jsx'

createRoot(document.getElementById('root')).render(

  <GlobalContextProvider childComponent={<App />} />

)
