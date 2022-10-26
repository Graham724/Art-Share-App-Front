//React features & hooks
import { useEffect, useState } from 'react'
import { useNavigate, BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom'

//React-Bootstrap components
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Other styling
import '../artworkDisplay.css';

export default function DisplayArtwork () {
    const {id} = useParams();
    console.log(id)
    const [artwork, setArtwork] = useState([])
    const navigate = useNavigate();

    let handleDelete = async () => {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/artworks/${id}`
        await fetch(URL, {
         method: "DELETE",
        });
        navigate('/artworks')
       };

       useEffect(() => {
        const fetchData = async () => {
             console.log(process.env)
             const URL = `${process.env.REACT_APP_BACKEND_URL}/api/artworks/${id}`
             console.log(URL)
             const response = await fetch(URL)
             const data = await response.json()
             setArtwork(data)
        }
        fetchData()
   }, [])


   const display = (
        <Container className="artwork-display">
            <Row>
                <Col className='artwork-img-desc'>
                    <img alt="art" variant="bottom" src={artwork.imgURL}/>
                    <p>
                        <span style={{fontWeight: 'bold'}}>Size: </span>{artwork.size} 
                    </p>
                </Col>
                <Col>
                    <header className="artwork-display-header">
                        <h1>{artwork.title}</h1>
                        <h3>Artist: {artwork.artist}</h3>
                    </header>
                    <p>
                        <span style={{fontWeight: 'bold'}}>Description:</span>{artwork.desc} 
                    </p>
                </Col>
            </Row>
        </Container>
   )

   return (
    <div>
      <Row>
         {display}
      </Row>
      <Button onClick={handleDelete} className='delete-buttons' variant="danger" style={{float: 'left', marginRight: '7px'}}>
          Delete Artwork
         </Button>
      <Link to={`/updateArtwork/${id}`}>
         <Button className='edit-buttons' variant="warning" style={{float: 'left', marginRight: '7px'}}>
           Edit Artwork
          </Button>
      </Link>
         <Link to='/artworks'>
          <Button className='back-buttons' variant="info" style={{float: 'left'}}>
            Back to Artworks
           </Button>
         </Link>
    </div>
   ) 
}