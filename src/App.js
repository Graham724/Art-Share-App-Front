//React Features
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

//styling
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'

//Components
import Home from './Components/Home'
import AllArtworks from './Components/AllArtworks';
import CreateArtwork from './Components/CreateArtwork';
import DisplayArtwork from './Components/DisplayArtwork';
import EditArtwork from './Components/EditArtwork';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <h1 className="App-title">Art Share</h1>
      </header>
      <nav className="App-nav">
      <Container>
            <Nav variant='pills' fill defaultActiveKey="/Home">
              <Nav.Item>
                <Link to="/">Home</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/artworks">Artworks</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/createArtwork">Create Art Post</Link>
              </Nav.Item>
            </Nav>
          </Container>
      </nav>

      <div className="display">
        <Routes>
        <Route path ='/' element={<Home/>} />
        <Route path ='/artworks' element={<AllArtworks/>} />
        <Route path ='/createArtwork' element={<CreateArtwork/>} />
        <Route path ='/getArtwork/:id' element={<DisplayArtwork/>} />
        <Route path ='/deleteArtwork/:id' element={<AllArtworks/>} />
        <Route path ='/updateArtwork/:id' element={<EditArtwork/>} />
        </Routes>
      </div>

      </Router>
    </div>
  );
}

export default App;
