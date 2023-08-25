import { Link, useParams, useOutletContext } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export function AlbumPage() {
    const {name} = useParams()
    const {token} = useOutletContext()
    const [albumsData, setAlbumsData] = useState([])

    const searchAlbumTracks = async (e) => {
        if (token) {
            try {
                const response = await axios.request({
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://api.spotify.com/v1/albums/${name}/tracks?market=US`,
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAlbumsData(response.data.items)
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(()=>{
        searchAlbumTracks()
    },[token])
    useEffect(()=>{
    },[albumsData])

        return (
            <>
                <p>This is the Album Page</p>
            <ol>
                {albumsData ? (
                        albumsData.map((song, idx) => (
                            <li key={idx}>{song.name}</li>
                        ))
                    ) : (
                        <p>Loading playlists...</p>
                    )}
            </ol>
            </>
        )
    }