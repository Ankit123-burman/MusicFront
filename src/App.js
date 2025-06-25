import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import ArtistPage from './pages/Artist';
import RefrshHandler from './RefrshHandler';
import Atiff from './SongArtis.js/Atiff';
import Nehaa from './SongArtis.js/Nehaa';
import KumarShanu from './SongArtis.js/KumarShanu';
import Anuvv from './SongArtis.js/Anuvv';
import Kingg from './SongArtis.js/Kingg';
import Honeey from './SongArtis.js/Honeey';
import Edshreeen from './SongArtis.js/Edshreeen';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/arijit' element={<ArtistPage />} />
        <Route path='/atif' element={<Atiff />} />
        <Route path='/neha' element={<Nehaa />} />
        <Route path='/kumarsanu' element={<KumarShanu />} />
        <Route path='/king' element={<Kingg />} />
        <Route path='/Anuv' element={<Anuvv />} />
        <Route path='/honeey' element={<Honeey/>}/>
        <Route path='/edshreen' element={<Edshreeen/>}/>

        
        
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
