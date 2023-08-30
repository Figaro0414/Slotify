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
                // console.log(availableGenres)
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
        <div className="border-solid border-2 border-sky-500 text-white h-">
            <h1 className="text-bold text-center">Home Page</h1>
            <ol className="flex flex-wrap space-x-4 text-center">
                {playlistsData ? (
                    playlistsData.map((playlist, idx) => (
                        <li className="my-4 rounded-lg border-2 border-green-600 w-fit" key={idx}>
                            <img src={playlist.images[0].url} className="object-scale-down h-48 w-48" />
                            <Link to={`/playlistPage/${playlist.id}`}>{playlist.name}</Link>
                        </li>
                    ))
                ) : 
                    <p>Loading playlists...</p>
                }
            </ol>
        </div>
    )
}