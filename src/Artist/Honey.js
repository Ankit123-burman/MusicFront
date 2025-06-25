import React from 'react';
import { useNavigate } from 'react-router-dom';
import Honey1 from '../images/Honey.png'
function Honey() {
    const navigate = useNavigate();

    const goToArtistPage = () => {
        navigate('/honeey');
    };

    return (
        <>
        <div className="artists-container">
            <div className="artist-item">
                <div onClick={goToArtistPage} className="artist-image-container">
                    <img src={Honey1} alt="Artist 1" className="artist-image" />
                </div>
                <p className="artist-name">Honey</p>
            </div>
        </div>
        <style>
      {` .artists-container {
         display: inline-block
          overflow-x: auto;
          padding-bottom: 16px;
        }
        
        .artists-container::-webkit-scrollbar {
          display: none;
          
        }
        
        .artists-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
         
        }
        
        .artist-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .artist-image-container {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }
        
        .artist-image-container:hover {
          transform: scale(1.05);
        }
        
        .artist-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .artist-name {
          margin-top: 8px;
          font-size: 0.875rem;
          color: white;
        }`}
        

        </style>
        </>
    );
}

export default Honey;
