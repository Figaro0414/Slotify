import { Link, useParams, useOutletContext } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export function ArtistPage() {
    const {name} = useParams()
    const {token} = useOutletContext()
    const [albumsData, setAlbumsData] = useState([])
    const [artistData, setArtistData] = useState([])
    const [imgUrl, setImgUrl] = useState('')
    
    useEffect(()=>{
        const getArtistInfo = async (e) => {
            // if (token) {
                try {
                    const response = await axios.request({
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `https://api.spotify.com/v1/artists/${name}`,
                        headers: { 
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setArtistData(response.data)
                } catch (error) {
                    console.log(error);
                }
            // }
        }
        const getArtistAlbums = async (e) => {
            // if (token) {
                try {
                    const response = await axios.request({
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `https://api.spotify.com/v1/artists/${name}/albums?include_groups=album&market=US`,
                        headers: { 
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setAlbumsData(response.data.items)
                } catch (error) {
                    console.log(error);
                }
            // }
        }
        getArtistInfo()
        getArtistAlbums()
    },[token])
    useEffect(()=>{
        if (artistData.length !== 0){
            setImgUrl(artistData.images[0].url)
        }
    },[albumsData, imgUrl])
    return (
        <>
            <h1 className="text-center text-2xl">{artistData.name}</h1>
            <img className="object-cover h-20 w-20" src={imgUrl}/>
            <h2 className="text-center">Albums</h2>
            <ol>
                {albumsData ? (
                        albumsData.map((album, idx) => (
                            <li key={idx}>
                                <img className="object-cover h-20 w-20" src={album.images[0].url}/>
                                <Link to={`/album/${album.id}`}>{album.name}</Link>
                            </li>
                        ))
                    ) : (
                        <p>Loading playlists...</p>
                    )}
            </ol>
            </>
        )
    }