import { useState, useEffect} from 'react';
import qs from 'qs';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import axios from 'axios';
import Search from './Search';

export default function App() {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [artistID, setArtistID] = useState('');
  const [albums, setAlbums] = useState([])
  const clientID = import.meta.env.VITE_CLIENT_ID
  const secretID = import.meta.env.VITE_CLIENT_SECRET

  useEffect(()=> {
    let data = qs.stringify({
      'grant_type': 'client_credentials',
      'client_id': clientID,
      'client_secret': secretID
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://accounts.spotify.com/api/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      data:data
    };
    axios.request(config)
    .then((response) => {
      setAccessToken(response.data.access_token)
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])
  // --------------------------------------------------------------------------------------------
    async function search(){
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&market=ES`,
        headers: { 
          'Authorization': 'Bearer ' + accessToken
        }
      };
      axios.request(config)
      .then((response) => {
        setArtistID(response.data.artists.items[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
      // -----------------------------------------------------------------------------------------
      let config1 = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.spotify.com/v1/artists/${artistID}/albums`,
        headers: { 
          'Authorization': 'Bearer ' + accessToken
        }
      };
      
      axios.request(config1)
      .then((response) => {
        setAlbums(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
    };
  return (
    <>
    <Search />
    <div className='App'>
      <Container>
        <InputGroup className='mb-3' size='lg'>
          <FormControl 
            placeholder='search For Artist'
            type='input'
            onKeyDown={event => {
              if (event.key === "Enter") {
                search()
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        {/*  className='mx-2 row row-cols-4' */}
        <Row className='mx-2 row row-cols-4'>
          {albums.map( (album, i) => {
            console.log(album)
            return (
            <Card>
            <Card.Img src={album.images[0].url} />
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
            </Card.Body>
          </Card>)
          })}
        </Row>
      </Container>
    </div>
    </>
  )
}