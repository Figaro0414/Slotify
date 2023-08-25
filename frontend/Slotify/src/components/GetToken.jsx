import axios from "axios";
import { useEffect, useState } from "react";

export function SpotifyToken() {
    const clientID = import.meta.env.VITE_CLIENT_ID
    const secretID = import.meta.env.VITE_CLIENT_SECRET
    const [apiToken, setApiToken] = useState('')

    useEffect(()=>{
        getToken()
    },[])

    const getToken = async () =>{
    let data = ({
        'grant_type': 'client_credentials',
        'client_id': clientID,
        'client_secret':  secretID
        });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://accounts.spotify.com/api/token',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data : data
        };
    
    await axios.request(config).then((response) =>{
        setApiToken(response.data.access_token)
    }).catch((error)=>{
            console.log(error)
        })
    }
    return (apiToken)
}