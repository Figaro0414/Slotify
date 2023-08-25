import { useNavigate, useParams, useOutletContext } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export const PlaylistPage = () => {
    const {name} = useParams()
    const {token} = useOutletContext()
    const [songData, setSongData] = useState([])
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
    return (
    <>
        <h2>Welcome to PlaylistPage</h2>
        <ol>
            {songData.map((song, idx)=>(
                <li key={idx}>
                    <p>Name: {song.track.name} ------------- Artist: {song.track.artists[0].name}</p> 
                </li>
            ))}
        </ol>
    </>
    )}