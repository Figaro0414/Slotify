import { Link, useParams, useOutletContext } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { backEndApi } from "../utilities"

export function AlbumPage() {
    const {name} = useParams()
    const {token} = useOutletContext()
    const [albumsData, setAlbumsData] = useState([])
    const [albumInfo, setAlbumInfo] = useState([])
    const [albumImg, setAlbumImg] = useState('')

    const getAlbumInfo = async (e) =>{
        if (token) {
            try {
                const response = await axios.request({
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://api.spotify.com/v1/albums/${name}?market=US`,
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAlbumInfo(response.data)
                setAlbumImg(response.data.images[0].url)
            } catch (error) {
                console.log(error);
            }
        }
    }
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


    useEffect(()=>{
        searchAlbumTracks()
        getAlbumInfo()
    },[token])
    useEffect(()=>{
        console.log(albumsData)
        console.log(albumInfo)
    },[albumsData, albumInfo, albumImg])

        return (
            <>
            <div className="grid justify-center text-white">
                <p className="flex flex-col text-center">{albumInfo.name}</p>
                {albumImg? <img className='object-scale-down h-48 w-48' src={albumImg} /> : <p>Loading.....</p>}
            </div>
            <ol className="grid justify-center text-white">
                {albumsData ? (
                        albumsData.map((song, idx) => (
                            <div className='flex justify-center space-x-4' key={idx}>
                                <li>{song.track_number}. {song.name}</li>
                                <button className='rounded-lg border-solid border-2 border-green-600' onClick={() => {createSong((song.name),(song.id),(song.artists[0].name),(albumInfo.name));
                        }}>Save Song</button>
                            </div >
                        ))
                    ) : (
                        <p>Loading playlists...</p>
                    )}
            </ol>
            </>
        )
    }