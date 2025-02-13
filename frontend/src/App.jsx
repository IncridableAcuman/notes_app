import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Auth from './pages/Auth'
import PrivateRoutes from './api/PrivateRoutes'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<PrivateRoutes element={<Home/>} />} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/notes' element={<Post/>} />
    </Routes>
    </>
  )
}

export default App