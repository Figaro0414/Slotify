import { useState, useEffect} from 'react';
import axios from 'axios';
import { SongCard } from '../components/SongCard';
import { Link, useOutletContext } from 'react-router-dom';

export const SearchPage = ()=>  {
    const {token} = useOutletContext()
    const [searchInput, setSearchInput] = useState('');
    const [tracksData, setTracksData] = useState([]);
    const [artistsData, setArtistsData] = useState([]);
    const [albumData, setAlbumsData] = useState([]);


    //   // --------------------------------------------------------------------------------------------
    async function searchTracks(){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.spotify.com/v1/search?q=${searchInput}&type=track&market=US&limit=50`,
            headers: { 
            'Authorization': 'Bearer ' + token
            }
        };
        axios.request(config).then((response) => {
            setTracksData(response.data.tracks.items);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    async function searchArtists(){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&market=US&limit=50`,
            headers: { 
            'Authorization': 'Bearer ' + token
            }
        };
        axios.request(config).then((response) => {
            setArtistsData(response.data.artists.items);
        })
            .catch((error) => {
            console.log(error);
        });
    }
    async function searchAlbums(){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.spotify.com/v1/search?q=${searchInput}&type=album&market=US&limit=50`,
            headers: { 
            'Authorization': 'Bearer ' + token
            }
        };
        axios.request(config).then((response) => {
            setAlbumsData(response.data.albums.items);
        })
            .catch((error) => {
            console.log(error);
        });
        
    }

    return (
    <>
    <div className='border-solid border-2 border-red-500 bg-black h-32 w-auto grid justify-center z-10'>
        <input 
            className='rounded-lg text-center text-xl mb-2'
            type='text' 
            placeholder='search' 
            onChange={(e)=> setSearchInput(e.target.value)} 
            value={searchInput}
            />
        <div className='flex space-x-10 w-fit'>
            <button className='h-auto w-40 bg-gray-400 rounded-lg text-lg' onClick={() => [searchTracks(), setSearchInput("")]}> Search Track </button>
            <button className='h-auto w-40 bg-gray-400 rounded-lg' onClick={() => [searchArtists(), setSearchInput("")]}> Search Artist </button>
            <button className='h-auto w-40 bg-gray-400 rounded-lg' onClick={() => [searchAlbums(), setSearchInput("")]}> Search Album </button>
        </div>
    </div>
        <div className='border-solid border-2 border-blue-500'> 
            <ol>
                {tracksData ? tracksData.map((data, idx) =>(
                    <li key={idx}>
                        <p>{data.name}</p>
                    </li>
                )): ( <p>loading</p>)}
            </ol>
        </div>
        <div className='border-solid border-2 border-black'> 
            <ol>
                {artistsData ? (artistsData.map((data, idx) =>(
                    <li key={idx}>
                        <Link to={`/artist/${data.id}`}>{data.name}</Link>
                    </li>
                ))): (<p>Howdy</p>)}
            </ol>
        </div>
    </>
    )}