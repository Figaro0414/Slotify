import { useNavigate, useParams } from "react-router-dom"
import axios from "axios" 

export const PlaylistCard = () => {
    const {name} = useParams()
    const navigate = useNavigate()

    // const getAPlaylist = async () => {
    //     let response = await axios.get(`https://api.spotify.com/v1/playlists/${name}/tracks?market=ES`)
    // }
    console.log(name)
    return (
        <>
        </>
    )
}