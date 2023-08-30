import { useNavigate, useParams, useOutletContext } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { DropDown } from "../components/DropDown"

export const PlaylistPage = () => {
    const {name} = useParams()
    const {token} = useOutletContext()
    const [songData, setSongData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        getSongs()
    },[token])

    const getSongs = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.spotify.com/v1/playlists/${name}/tracks?market=US`,
            headers: { 
            'Authorization': 'Bearer ' + token
            }
        };
        await axios.request(config).then((response) => {
            setSongData(response.data.items);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    useEffect(()=>{
        console.log(songData)
    },[songData])

    async function createSong(songName, newSongID, songArtist, albumName) {
        let data = {
            "name": songName,
            "songID" : newSongID,
            "artistName": songArtist,
            "albumName": albumName
        }
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/songs/',
            headers : {
                'Authorization': `Token ${localStorage.getItem("token")}`,
                'Content-Type' : 'application/json'
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
    return (
    <div className="text-white h-auto">
        <h2>Welcome to PlaylistPage</h2>
        <ol>
            {songData.map((song, idx)=>(
                <li key={idx}>
                    <p>Name: {song.track.name} ------------- Artist: {song.track.artists[0].name}</p>
                    <button className="rounded-lg border-solid border-2 border-green-600 w-fit" onClick={() => {createSong((song.track.name),(song.track.id),(song.track.artists[0].name),(song.track.album.name));
                    }}>Save Song</button>
                </li>
            ))}
        </ol>
    </div>
    )}