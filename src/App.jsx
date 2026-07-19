import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth";
import  {login, logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom';
import {Header, Footer} from "./components/index"

function App() {

  const [loading, setLoading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch((error)=>{
      console.error("App::Authentication check failed", error);
      dispatch(logout());
    })
    .finally(()=>setLoading(false))
  },[dispatch])
  

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):(
    <div className="min-h-screen flex items-center justify-center bg-gray-500 text-white">
      <p className="text-xl font-semibold animate-pulse">Loading Application...</p>
    </div>
  )
}

export default App
