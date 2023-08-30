import { createContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {SpotifyToken} from './components/GetToken';
import { backEndApi } from './utilities';
import axios from 'axios';

export const userContext = createContext();

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState()
  const tokenKey = SpotifyToken()
  const navigate = useNavigate()
  const [imgLogo, setImgLogo] = useState('')

  useEffect(()=>{
    console.log(user)
  },[user])
  
  const whoAmI = async() =>{
    let userToken = localStorage.getItem("token")
    if (userToken) {
      backEndApi.defaults.headers.common["Authorization"] = `Token ${userToken}`
      let response = await backEndApi.get("users/info/")
      setUser(response.data)
      navigate("home")
    } else {
      setUser(null)
      navigate("signin")
    }
  }
  const logoImg = async () => {
    let config ={
      method: "get",
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/noun/',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try{
      const response = await axios.request(config)
      setImgLogo(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    whoAmI()
    logoImg()
  },[])

  useEffect(()=>{
    setToken(tokenKey)
  },[tokenKey])

  const signOut = async() =>{
    let response = await backEndApi.post("users/signout/")
    if(response.status === 204){
      localStorage.removeItem("token")
      setUser(null)
      delete backEndApi.defaults.headers.common["Authorization"]
      navigate("/signin")
    }
  }

  return (
  <div className='bg-black'>
    <header className='flex justify-center'>
      <nav className='flex space-x-32 text-white'>
        {user ? 
        <>
          {imgLogo? (<img src={imgLogo} className='bg-white rounded-lg h-8 w-8'/>): <p>Loading...</p>}
          <h1 className='text-2xl'>Welcome!</h1>
          <Link to={"/home"} className="text-sky-500 text-xl">Slotify</Link>
          <Link to={"/myPlaylist/"} className="text-green-500 text-xl">Playlist</Link>
          <Link to={"/searchPage"} className="text-red-500 text-xl">Search</Link>
          <Link to={"/allsongs"} className="text-purple-600 text-xl">Saved Songs</Link>
          <button className='bg-red-500 text-black rounded-lg' onClick={signOut}>Sign Out</button>
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