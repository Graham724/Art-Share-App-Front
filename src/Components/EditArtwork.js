import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../form.css'

export default function EditArtwork () {
    const {id} = useParams()

    const [title, setTitle] = useState('')
    const [imgURL, setImgURL] = useState('')
    const [desc, setDesc] = useState('')
    const [artist, setArtist] = useState('')
    const [size, setSize] = useState('')

    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
             console.log(process.env)
             const URL = `${process.env.REACT_APP_BACKEND_URL}/api/artworks/${id}`
             console.log(URL)
             const response = await fetch(URL)
             const data = await response.json()
             setTitle(data.title)
             setImgURL(data.imgURL)
             setDesc(data.desc)
             setArtist(data.artist)
             setSize(data.size)
        }
        fetchData()
    }, [])


    const handleSubmit= async (e) => {
        e.preventDefault()
    
        const artwork = {title, imgURL, desc, artist, size}
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/artworks/${id}`
        const response = await fetch(URL, {
          method: 'PATCH',
          body: JSON.stringify(artwork),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
    
        if (!response.ok) {
          setError(data.error)
          console.log(data)
        }
        if (response.ok) {
          setError(null)
          setTitle('')
          setImgURL('')
          setDesc('')
          setArtist('')
          setSize('')
          console.log('new artwork edited:', data);
          navigate(`/getArtwork/${id}`)
        }
      }


      return (
        <Form className="createArt" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formArtworkName">
            <Form.Label>Artwork Name</Form.Label>
            <Form.Control 
            type="text" 
            required="required" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter Artwork Name" 
            maxLength={40}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>Image</Form.Label>
            <Form.Control 
            type="text" 
            required="required" 
            onChange={(e) => setImgURL(e.target.value)}
            value={imgURL}
            placeholder="Enter Image URL" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formArtist">
            <Form.Label>Artist</Form.Label>
            <Form.Control 
            type="text" 
            required="required" 
            onChange={(e) => setArtist(e.target.value)}
            value={artist}
            placeholder="Enter Artist's Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            type="text" 
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Enter Description/ Mediums Used" 
            maxLength={50}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSize">
            <Form.Label>Size</Form.Label>
            <Form.Control 
            type="text" 
            required="required" 
            onChange={(e) => setSize(e.target.value)}
            value={size}
            placeholder="Enter Estimated Size of Artwork" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      );
}