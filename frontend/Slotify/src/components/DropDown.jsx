import { useEffect, useState } from "react"
import { backEndApi } from "../utilities"
import axios from "axios"


export const DropDown = (props) =>{
    const [playlistData, setPlaylistData] = useState([])
    const [playlistOption, setPlaylistOption] = useState(null)

    const getPlaylist = async()=>{
        try{
        let userToken = localStorage.getItem("token")
        if (userToken){
            backEndApi.defaults.headers.common["Authorization"] = `Token ${userToken}`
            let response = await backEndApi.get('playlists/')
            setPlaylistData(response.data)
            } 
        } catch(error) {
            console.error("Error fetching playlist data:", error);
        }
    }
    async function addToPlaylist() {
        let data = {
            "method" : "add",
            "songID" : props.songid
        }
        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/playlists/${playlistOption}/`,
            headers: {
                'Authorization': `Token ${localStorage.getItem("token")}`, 
                'Content-Type': 'application/json'
            },
            data : data
        };
        try {
            const response = await axios.request(config)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getPlaylist()
    },[])

    useEffect(()=>{
        console.log(playlistOption)
    },[playlistOption])

    useEffect(()=>{
        console.log(playlistData)
    },[playlistData])

    return (
        <div className="relative w-fit lg:max-w-sm rounded-full border-solid border-2 border-black">
            <select onChange={(event)=> setPlaylistOption(event.target.value)} className="w-fit p-2.5 text-gray-500 bg-white rounded-full shadow-sm border-solid border-2 border-black focus:border-indigo-600">
                <option>select an option</option>
                {playlistData ? ( playlistData.map((playlist, idx) =>(
                <option key={idx} value={playlist.id}>{playlist.title}</option>
                ))):(<p>Loading playlist</p>)}
            </select>
            <button className="rounded-full border-solid border-2 border-green-600" onClick={()=> addToPlaylist()}>Add to playlist</button>
        </div>
    )
}