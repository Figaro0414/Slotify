import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const PlaylistSongs = () => {
    const [songData, setSongData] = useState([])
    const [status, setStatus] = useState(true)
    const {id} = useParams()

    async function getPlaylistSongs(){
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/playlists/${id}/`,
            headers : {
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type' : 'application/json'
            }
        }
        try {
            const response = await axios.request(config)
            setSongData(response.data.song)
        } catch (error) {
            console.log(error)
        }
    }
    async function removeSong(songremoveID){
        let data = {
            "method": "remove",
            "songID" : songremoveID
        }
        let config ={
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/playlists/${id}/`,
            headers: {
                'Authorization' : `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            data : data
        }
        try {
            const response = await axios.request(config)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getPlaylistSongs()
    },[])
    useEffect(()=>{
        getPlaylistSongs()
        setStatus(true)
    },[status])
    return(
        <div className="text-white">
            <h1>Playlist Songs</h1>
            <ol>
                {songData? songData.map((song, idx) =>(
                    <li className='ml-6 my-3 rounded-lg border-solid border-2 border-black w-fit' key={idx}>{song.name} ------------ {song.artistName} ------------ {song.albumName} ------------ {song.rating} ------------ <button className='rounded-lg border-solid border-2 border-red-600 text-center w-fit' onClick={() => [removeSong(song.songID),setStatus(false)]}>Remove</button></li>
                )):(<p>Loading songs</p>)}
            </ol>
        </div>
    )
}