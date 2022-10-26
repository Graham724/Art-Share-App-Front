//React features & hooks
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

//React-Bootstrap components
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'

//Other Styling
import '../Home.css'

export default function AllArtworks() {
    const [artworks, setArtworks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
             const URL = `${process.env.REACT_APP_BACKEND_URL}/api/artworks`
             const response = await fetch(URL)
             const data = await response.json()
             setArtworks(data)
        }
        fetchData()
   }, [])  

const display = artworks && artworks.map((eachArtwork) => {
    return (
        <Col xs={12} md={4} sm={6} lg={4} className='p-2' key={eachArtwork._id}>
          <CardGroup>
          <Card>
               <Card.Header style={{height: '75px'}}>
                    <Card.Title>
                         {eachArtwork.title}
                    </Card.Title>
               </Card.Header>
               <Card.Img style={{height: '300px'}} alt='Art' variant='bottom' src={eachArtwork.imgURL} />
               <ListGroup className="list-group-flush">
                    <ListGroup.Item><span style={{fontWeight: 'bold'}}>Artist: </span>{eachArtwork.artist}</ListGroup.Item>
                    <ListGroup.Item><span style={{fontWeight: 'bold'}}>Size: </span>{eachArtwork.size}</ListGroup.Item>
               </ListGroup>
               <Card.Footer>
                    <Link to={`/getArtwork/${eachArtwork._id}`}>
                         <Button variant="primary">Go To Artwork</Button>
                    </Link>
               </Card.Footer>
          </Card>
          </CardGroup> 
     </Col>
    )
})

return (
     <div>
          <h1>Artworks Posted!</h1>
          <Container>
             <Row>
                  {display}
             </Row>
        </Container>
             <Link to='/createArtwork'>   
                  <Button className='create-buttons' variant="success" style={{float: 'right', marginRight: '-5px', marginTop: '50px'}}>Create Art Post</Button>
             </Link>
     </div>
    ) 
}