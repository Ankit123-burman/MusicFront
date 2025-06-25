import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { PlayCircle, PauseCircle, Search } from 'lucide-react';
import Arijit from './Arijit';
import Atif from '../Artist/Atif';
import Edshreen from '../Artist/Edshreen';
import Anuv from '../Artist/Anuv';
import Honey from '../Artist/Honey';
import King from '../Artist/king';
import Neha from '../Artist/Neha';
import KumarSanu from '../Artist/KumarSanu';
import Emran from '../Songs/Tum Mile SongsEmraan.mp3'
import Bollywood from '../Songs/Bollywood.mp3'
import NostalgicLove from '../Songs/NostalgicLove.mp3'
import love from '../images/love.png'
import motiation from '../images/motivation.png'
import motivationsong from '../Songs/WorkoutMashup.mp3'




function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };



  const songs = [
    {
      title: 'KK Non Stop',
      artist: 'KK',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw98dZT5KW7bXK_LmyHpgUah2Vw_f-ZRy1Q&s',
      url: Emran
    },
    {
      title: 'Bollywood Ultimate Jukebox  Non Stop',
      artist: 'Mix Song',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIliF3IF_SeUSBr1uUqxDe85VcAi6gNhlWcQ&s',
      url: Bollywood
    },
    {
      title: 'NostalgicLove',
      artist: 'NostalgicLove',
      image: love,
      url: NostalgicLove,
    },
    {
      title: 'Sample Song 3',
      artist: 'SoundHelix',
      image: motiation,
      url: motivationsong,
    },
  ];


   const Trandingsongs = [
    {
      title: 'KK Non Stop',
      artist: 'KK',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw98dZT5KW7bXK_LmyHpgUah2Vw_f-ZRy1Q&s',
      url: Emran
    },
    {
      title: 'Bollywood Ultimate Jukebox  Non Stop',
      artist: 'Mix Song',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIliF3IF_SeUSBr1uUqxDe85VcAi6gNhlWcQ&s',
      url: Bollywood
    },
    {
      title: 'NostalgicLove',
      artist: 'NostalgicLove',
      image: love,
      url: NostalgicLove,
    },
    {
      title: 'Sample Song 3',
      artist: 'SoundHelix',
      image: motiation,
      url: motivationsong,
    },
    {
      title: 'KK Non Stop',
      artist: 'KK',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw98dZT5KW7bXK_LmyHpgUah2Vw_f-ZRy1Q&s',
      url: Emran
    },
    {
      title: 'Bollywood Ultimate Jukebox  Non Stop',
      artist: 'Mix Song',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIliF3IF_SeUSBr1uUqxDe85VcAi6gNhlWcQ&s',
      url: Bollywood
    },
    {
      title: 'NostalgicLove',
      artist: 'NostalgicLove',
      image: love,
      url: NostalgicLove,
    },
    {
      title: 'Sample Song 3',
      artist: 'SoundHelix',
      image: motiation,
      url: motivationsong,
    },
    {
      title: 'KK Non Stop',
      artist: 'KK',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw98dZT5KW7bXK_LmyHpgUah2Vw_f-ZRy1Q&s',
      url: Emran
    },
    {
      title: 'Bollywood Ultimate Jukebox  Non Stop',
      artist: 'Mix Song',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIliF3IF_SeUSBr1uUqxDe85VcAi6gNhlWcQ&s',
      url: Bollywood
    },
    {
      title: 'NostalgicLove',
      artist: 'NostalgicLove',
      image: love,
      url: NostalgicLove,
    },
    {
      title: 'Sample Song 3',
      artist: 'SoundHelix',
      image: motiation,
      url: motivationsong,
    },
  ];



  const togglePlay = (index) => {
    if (playingIndex === index) {
      audioRef.current.pause();
      setPlayingIndex(null);
    } else {
      setPlayingIndex(index);
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  return (
    <>
      <ToastContainer />
      <header className="header">
        <h1 className="app-title">SoundWave</h1>
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search songs, artists..."
            className="search-input"
          />
        </div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">Home</li>
            <li className="nav-item">Browse</li>
            <li className="nav-item">Library</li>
            <span className="logout-button">
              <li onClick={handleLogout} className="logout-text">LogOut</li>
            </span>
          </ul>
        </nav>
      </header>

      <main>
        <h2 className="section-title">Top Songs</h2>
        <div className="songs-grid">
          {songs.map((song, index) => (
            <div key={index} className="song-card">
              <img src={song.image} alt={song.title} className="song-image" />
              <h3 className="song-title">{song.title}</h3>
              <p className="song-artist">{song.artist}</p>
              <button className="play-button" onClick={() => togglePlay(index)}>
                {playingIndex === index ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                {playingIndex === index ? 'Pause' : 'Play'}
              </button>
            </div>
          ))}
        </div>

        {playingIndex !== null && (
          <audio ref={audioRef} src={songs[playingIndex].url} autoPlay controls style={{ display: 'none' }} />
        )}

        <h2 className="section-title trending-title">Trending Now</h2>
        <div className="slider-container">
          <div className="slider-track">
            {Trandingsongs.map((song, index) => (
              <img key={index} src={song.image} alt={`Trending ${index}`} className="slider-image" />
            ))}
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Popular Artists</h2>
          <button className="show-all-button">Show all</button>
        </div>
        <div className='circular' >
        <Arijit />
        <Atif />
        <Honey />
        <Anuv />
        <King />
        <Edshreen />
        <Neha />
        <KumarSanu />
        </div>

      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">SoundWave</h3>
            <p className="footer-description">
              The best music streaming platform for all your audio needs. Discover new music and enjoy your favorite tracks.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">Browse</a></li>
              <li><a href="#" className="footer-link">Library</a></li>
              <li><a href="#" className="footer-link">Premium</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Jobs</a></li>
              <li><a href="#" className="footer-link">Press</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
            </div>
            <div className="newsletter">
              <p>Subscribe to our newsletter</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" className="newsletter-input" />
                <button className="newsletter-button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2025 SoundWave. All rights reserved.</p>
          <div className="legal-links">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </footer>

      <style>{`
       
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
    background-color: #121212;
  }
    .circular{
     display: flex;
     justify-content: space-between;
     gap:50px
    }

  /* Header Styles */
  .header {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    padding: 20px;
  }

  @media (min-width: 768px) {
    .header {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
  }

  .app-title {
    font-size: 1.875rem;
    font-weight: 700;
  }

  .search-container {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    padding: 8px 16px;
    border-radius: 9999px;
    width: 100%;
    margin-top: 12px;
  }

  @media (min-width: 768px) {
    .search-container {
      width: 33.333%;
      margin-top: 0;
    }
  }

  .search-icon {
    color: #d1d5db;
  }

  .search-input {
    background-color: transparent;
    outline: none;
    border: none;
    color: white;
    margin-left: 8px;
    width: 100%;
  }

  .nav-list {
    display: flex;
    gap: 24px;
    list-style: none;
    align-items: center;
  }

  .nav-item {
    cursor: pointer;
  }

  .nav-item:hover {
    text-decoration: underline;
  }

  .logout-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background-color: #4c1d95;
    border-radius: 16px;
  }

  .logout-text {
    color: white;
    cursor: pointer;
  }

  .logout-text:hover {
    text-decoration: underline;
  }

  /* Section Titles */
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 16px;
    padding-left: 20px;
  }

  .trending-title {
    margin-top: 40px;
  }

  /* Songs Grid */
  .songs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }

  @media (min-width: 640px) {
    .songs-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 768px) {
    .songs-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .song-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    padding: 26px;
    backdrop-filter: blur(4px);
    transition: transform 0.3s ease;
  }

  .song-card:hover {
    transform: scale(1.05);
  }

  .song-image {
    border-radius: 0.75rem;
    margin-bottom: 16px;
    width: 100%;
    height: 192px;
    object-fit: cover;
  }

  .song-title {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .song-artist {
    font-size: 0.875rem;
    color: #d1d5db;
  }

  .play-button {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    padding: 8px 16px;
    background-color: #9333ea;
    border-radius: 9999px;
    border: none;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .play-button:hover {
    background-color: #7e22ce;
  }

  /* Slider */
  .slider-container {
    overflow: hidden;
    padding: 20px;
  }

  .slider-track {
    display: flex;
    gap: 12px;
    animation: scroll 15s linear infinite;
  }

  .slider-container:hover .slider-track {
    animation-play-state: paused;
  }

  .slider-image {
    height: 150px;
    width: auto;
    border-radius: 1rem;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  /* Footer */
  .footer {
    background-color: #1f1f1f;
    padding: 40px 20px;
    margin-top: 60px;
  }

  .footer-content {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;
  }

  .footer-section {
    flex: 1 1 200px;
  }

  .footer-title {
    font-size: 1.25rem;
    margin-bottom: 16px;
  }

  .footer-description {
    color: #d1d5db;
  }

  .footer-links {
    list-style: none;
    padding: 0;
  }

  .footer-link {
    color: #d1d5db;
    display: block;
    margin-bottom: 8px;
    text-decoration: none;
  }

  .footer-link:hover {
    text-decoration: underline;
  }

  .social-icons {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
  }

  .social-icon {
    color: #d1d5db;
    font-size: 1.25rem;
  }

  .newsletter-form {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  .newsletter-input {
    padding: 8px;
    border: none;
    border-radius: 8px;
    flex-grow: 1;
  }

  .newsletter-button {
    padding: 8px 16px;
    border: none;
    background-color: #9333ea;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }

  .newsletter-button:hover {
    background-color: #7e22ce;
  }

  .footer-bottom {
    margin-top: 32px;
    border-top: 1px solid #333;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #a1a1aa;
  }

  .legal-links {
    display: flex;
    gap: 16px;
  }

  .legal-link {
    color: #a1a1aa;
    text-decoration: none;
  }

  .legal-link:hover {
    text-decoration: underline;
  }


      `}</style>
    </>
  );
}

export default Home;
