import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";

export function HomePage() {
    const { token } = useOutletContext();
    const [playlistsData, setPlaylistsData] = useState([]);
    const getPlaylist = async (e) => {
        if (token) {
            try {
                const response = await axios.request({
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://api.spotify.com/v1/browse/featured-playlists?country=US&locale=sv_US&limit=20',
                    headers: { 
                        'Authorization': `Bearer ${token}`
                    }
                });
                const availableGenres = response.data.playlists.items;
                return  setPlaylistsData(availableGenres)
            } catch (error) {
                console.log(error);
            }
        };
        }
    useEffect(() => {
        getPlaylist(); 
    }, [token]); 

    return (
        <div className="border-solid border-2 border-sky-500">
            <h1 className="text-bold text-center">Home Page</h1>
            <ol>
                {playlistsData ? (
                    playlistsData.map((playlist, idx) => (
                        <li key={idx}>
                            <Link to={`/playlistPage/${playlist.id}`}>{playlist.name}</Link>
                        </li>
                    ))
                ) : (
                    <p>Loading playlists...</p>
                )}
            </ol>
        </div>
    )
}