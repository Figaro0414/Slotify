import { useEffect, useState } from "react"
import { backEndApi } from "../utilities"
import { DropDown } from "../components/DropDown"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const AllSongs = () => {
    const [songData, setSongData] = useState([])
    const [status , setStatus] = useState(true)
    
    const getData = async () =>{
        try {
            let userToken = localStorage.getItem('token')
            if (userToken){
                backEndApi.defaults.headers.common["Authorization"] = `Token ${userToken}`
                let response = await backEndApi.get('songs/')
                setSongData(response.data)
            }
        } catch(error) {
            console.log("Error Fetching Song data: " , error)
        }
    }

    async function deleteSong(songID){
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/api/songs/${songID}/`,
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
        try{
            const response = await axios.request(config)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        getData()
        setStatus(true)
    },[status])


    return(
        <div className="bg-black text-white h-auto">
        These are all the songs saved :
        <ol className="grid justify-items-left ">
            {songData ? (
                songData.map((song, idx) =>(
                    <li className="ml-6 my-3 flex flex-col rounded-lg border-solid border-2 border-green-600 w-fit" key={idx}>Name: {song.name} --------------  Album: {song.albumName} --------------  Artist: {song.artistName} --------------  Rating: {song.rating}          
                    <button className="flex flex-col rounded-lg border-solid border-2 border-red-600 text-center w-fit" onClick={()=> [deleteSong(song.id), setStatus(false)]}>Delete song from everywhere</button>
                    <DropDown songid={song.songID}/>
                    </li>
                ))
            ): (
                <p>
                    Loading songs.......
                </p>
            )}
        </ol>

        </div>
    )
}