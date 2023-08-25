import { createContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {SpotifyToken} from './components/GetToken';
import { backEndApi } from './utilities';

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState()
  const tokenKey = SpotifyToken()
  const navigate = useNavigate()

  // useEffect(()=>{
  //   console.log(user)
  // },[user])
  
  const whoAmI = async() =>{
    let userToken = localStorage.getItem("token")
    if (userToken) {
      backEndApi.defaults.headers.common["Authorization"] = `Token ${userToken}`
      let response = await backEndApi.get("users/")
      setUser(response.data)
      navigate("home")
    } else {
      setUser(null)
      navigate("signin")
    }
  }

  useEffect(()=>{
    whoAmI()
  },[])

  useEffect(()=>{
    setToken(tokenKey)
  },[tokenKey])

  const signOut = async() =>{
    let response = await backEndApi.post("users/signout/")
    if(response.status === 204){
      localStorage.removeItem("token")
      setUser(null)
      navigate("/signin")
    }
  }

  return (
  <div>
    <header>
      <nav className='flex space-x-32'>
        {user ? 
        <> 
          <h1 className='text-2xl'>Welcome!</h1>
          <Link to={"/home"} className="text-sky-500 ">Slotify</Link>
          <Link to={"/myPlaylist/"} className="text-green-500">Playlist</Link>
          <Link to={"/searchPage"} className="text-red-500">Search</Link>
          <button className='bg-blue-500 text-red-700' onClick={signOut}>Sign Out</button>
        </>
        : 
        <>
          <Link to={"/"}>Sign Up</Link>
          <Link to={"/signin"}>Sign In</Link>
        </>}
      </nav >
    </header>
    <userContext.Provider value={{user, setUser}}>
      <Outlet context={{token}}/>
    </userContext.Provider>
  </div>
  )
}

export default App;