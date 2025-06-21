import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './stores/useAuthStore'
import LoadingSpinner from './components/LoadingSpinner'
import CreatePostPage from './pages/CreatePostPage'
import GetMyPostPage from './pages/GetMyPostPage'
import { usePostStore } from './stores/usePostStore'
import EachPostPage from './pages/EachPostPage'

const App = () => {
  const {user,checkAuth,ischeckingAuth} = useAuthStore();
  const {loading} = usePostStore()
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  if(ischeckingAuth) return <LoadingSpinner/>
  
  return (
    
    <div className='relative'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={!user ? <LoginPage/> : <Navigate to='/'/>}/>
        <Route path='/signup' element={!user ? <SignUpPage/> : <Navigate to='/'/> }/>
        <Route path='/myprofile' element={user ? <ProfilePage/> : <Navigate to='/login'/>}/>
        <Route path='/create-post' element={user ? <CreatePostPage/> : <Navigate to='/login'/>}/>
        <Route path='/myposts' element={user ? <GetMyPostPage/> : <Navigate to='/login'/>}/>
        <Route path='/view-post/:id' element={user ? <EachPostPage/>: <Navigate to='/login'/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App