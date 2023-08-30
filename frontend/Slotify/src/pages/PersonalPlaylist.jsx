import { useEffect, useState } from "react";
import { backEndApi } from "../utilities";
import axios from "axios";
import { Link } from "react-router-dom";

export const MyPlaylist = () => {
    const [playlistData, setPlaylistData] = useState([])
    const [playlistTitle, setPlaylistTitle] = useState('')
    const [statusUpdate, setStatusUpdate] = useState(false)
    
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

    useEffect(()=>{
        getPlaylist()
        setStatusUpdate(false)
    },[statusUpdate])

    useEffect(()=>{
        console.log(playlistData)
    },[playlistData])
    
    async function createPlaylist(e) {
        e.preventDefault()
        let data = {"title": playlistTitle}
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/playlists/',
            headers: { 
                'Authorization': `Token ${localStorage.getItem("token")}`, 
                'Content-Type': 'application/json'
            },
                data : data
            };
        try {
            const response = await axios.request(config);
            setStatusUpdate(true)
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    async function deletePlaylist(playlistID){
        let config = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/playlists/${playlistID}/`,
            headers: {
                'Authorization' : `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
        try{
            const response = await axios.request(config)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="text-white">
            <p>This is my personal playlist</p>
        <div>
            <form onSubmit={(e) => [createPlaylist(e), setPlaylistTitle(''),setStatusUpdate(true)]}>
                <h2>Create PlayList</h2>
                <input
                className="rounded-lg text-black"
                type="text"
                placeholder="Playlist Name"
                value={playlistTitle}
                onChange={(e)=> setPlaylistTitle(e.target.value)} />
                <input type="submit" />
            </form>
        </div>
        <p>Your playlists:</p>
        <div className="ml-6 text-white text-xl border-2 rounded-lg w-fit">
            <ol className="flex flex-col space-y-4">
                {playlistData ? playlistData.map((playlist, idx ) =>(
                    <li className="flex flex-wrap space-x-9" key={idx}>
                        <Link  to={`/playlistsongs/${playlist.id}`}> {playlist.title} </Link>
                        <button className="rounded-lg border-solid border-2 border-red-600 text-center w-fit" onClick={()=> [deletePlaylist(playlist.id), setStatusUpdate(true)]}>Delete</button>
                        </li>
                )): <p>Loading......</p>}
            </ol>
        </div>
        </div>
    )
}