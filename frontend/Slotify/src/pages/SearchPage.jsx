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
            console.log(response.data.artists.items)
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
            console.log(response.data.albums.items)
            setAlbumsData(response.data.albums.items);
        })
            .catch((error) => {
            console.log(error);
        });
        
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

    },[tracksData, artistsData, albumData])

    return (
    <div className='bg-black text-white'>
    <div className='mt-6 h-32 w-auto grid justify-center z-10'>
        <input 
            className='rounded-lg text-center text-xl mb-2 text-black'
            type='text' 
            placeholder='search' 
            onChange={(e)=> setSearchInput(e.target.value)} 
            value={searchInput}
            />
        <div className='flex space-x-10 w-fit'>
            <button className='h-auto w-40 bg-gray-400 rounded-lg text-lg' onClick={() => [searchTracks(), setSearchInput(""), setAlbumsData(''), setArtistsData('')]}> Search Track </button>
            <button className='h-auto w-40 bg-gray-400 rounded-lg' onClick={() => [searchArtists(), setSearchInput(""), setTracksData(''), setAlbumsData('')]}> Search Artist </button>
            <button className='h-auto w-40 bg-gray-400 rounded-lg' onClick={() => [searchAlbums(), setSearchInput(""), setArtistsData(''), setTracksData('')]}> Search Album </button>
        </div>
    </div>
    <div> 
        <ol className='grid grid-cols-6 gap-4 w-fit h-auto'>
            {tracksData ? tracksData.map((data, idx) =>(
                <li key={idx} className='grid justify-items-center rounded-lg border-solid border-2 border-green-600 w-fit'>
                    {(data.album.images[0].url) ? (<img src={data.album.images[0].url} className='object-scale-down h-48 w-48'/>) : <p>Loading.....</p>}
                    <p className='break-all'>Track Name: {data.name}</p>
                    <p>Artist: </p>
                    <p>{data.artists[0].name}</p>
                    <p>Album:</p>
                    <p>{data.album.name}</p>
                    <button className='rounded-lg border-solid border-2 border-white' onClick={() => {createSong((data.name),(data.id),(data.artists[0].name),(data.album.name));
                    }}>Save Song</button>
                </li>
            )): ( <p className='text-black'>loading.....</p>)}
        </ol>
    </div>
    <div> 
        <ol className='flex flex-col space-y-4 space-x-4'>
            {artistsData ? (artistsData.map((artist, idx) =>(
                <li className='grid place-items-center text-7xl' key={idx}>
                    <Link className='rounded-lg border-solid border-2 border-white ' to={`/artist/${artist.id}`}>{artist.name}</Link>
                </li>
            ))): (<p className='text-black'>Loading.....</p>)}
        </ol>
    </div>
    <div> 
        <ol className='flex flex-wrap space-x-4 w-fit'>
            {albumData ? (albumData.map((album, idx) =>(
                <li className='border-solid border-2 border-green-600 text-center flex flex-col my-4' key={idx}>
                    {(album.images[0].url) ? (<img src={album.images[0].url} className='object-scale-down h-48 w-48'/>) : <p>Loading.....</p>}
                    <Link className='border-solid border-2 border-white rounded-lg' to={`/album/${album.id}`}> {album.name} </Link>
                </li>
            ))): (<p className='text-black'>Loading.....</p>)}
        </ol>
    </div>
    </div>
    )}