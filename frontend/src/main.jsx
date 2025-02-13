import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './contexts/UserProvider.jsx'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <UserProvider>
        <App />
    </UserProvider>
    </BrowserRouter>
)
