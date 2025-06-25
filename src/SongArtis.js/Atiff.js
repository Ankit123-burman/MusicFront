"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Search, SkipBack, Play, Pause, SkipForward } from "lucide-react"
import song1 from '../Songs/Atif Aslam/Atif Aslam/PehliNazar.mp3'
import song2 from '../Songs/Atif Aslam/Atif Aslam/SuneReprise .mp3'
import song3 from '../Songs/Atif Aslam/Atif Aslam/TereBin.mp3'
import song4 from '../Songs/Atif Aslam/Atif Aslam/TereLiye.mp3'
import Atifff from '../images/Atif.png'

// Sample song data
const sampleSongs = [
  { id: 1, title: "PehliNazar", artist: "Atiff", duration: "6:12", url: song1 },
  { id: 2, title: "TereLiye", artist: "Atiff", duration: "4:22", url: song2 },
  { id: 3, title: "SuneReprise", artist: "Atiff", duration: "5:30", url: song3 },
  { id: 4, title: "TereBin", artist: "Atiff", duration: "5:08", url: song4 },
  
]

export default function Atiff() {
  const [searchTerm, setSearchTerm] = useState("")
  const [songs, setSongs] = useState(sampleSongs)
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  // Filter songs based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSongs(sampleSongs)
    } else {
      setSongs(
        sampleSongs.filter(
          song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [searchTerm])

  // Load and update metadata when song changes or play state toggles
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Reset time when song changes
    setCurrentTime(0)

    // Load new source
    audio.load()

    // Event handlers
    const onLoaded = () => setDuration(audio.duration)
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)

    // Auto-play if flagged
    if (currentSong && isPlaying) {
      audio.play().catch(err => console.error('Playback failed:', err))
    }

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [currentSong, isPlaying])

  // Play/pause toggle
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(err => console.error('Playback failed:', err))
    }
    setIsPlaying(!isPlaying)
  }

  // Play a specific song
  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      // Toggle play/pause if same song clicked
      togglePlay()
    } else {
      setCurrentSong(song)
      setIsPlaying(true)
    }
  }

  // Skip controls
  const skipToPrevious = () => {
    if (!currentSong) return
    const idx = songs.findIndex(s => s.id === currentSong.id)
    if (idx > 0) playSong(songs[idx - 1])
  }
  const skipToNext = () => {
    if (!currentSong) return
    const idx = songs.findIndex(s => s.id === currentSong.id)
    if (idx < songs.length - 1) playSong(songs[idx + 1])
  }

  // Format time
  const formatTime = (t) => {
    if (isNaN(t)) return '0:00'
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  // Seek
  const handleProgressChange = (e) => {
    const t = +e.target.value
    audioRef.current.currentTime = t
    setCurrentTime(t)
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="container">
      <audio ref={audioRef}>
        <source src={currentSong?.url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="header">
        <div className="back-button"><ArrowLeft /></div>
        <div className="header-info">
          <h1 className="artist-title">{currentSong?.artist || 'Unknown Artist'}</h1>
          <p className="song-count">{songs.length} songs</p>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search songs"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" />
        </div>
      </div>

      <div className="content">
        <div className="song-list">
          {songs.length ? (
            <ul>
              {songs.map(song => (
                <li
                  key={song.id}
                  className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
                  onClick={() => playSong(song)}
                >
                  <div className="song-details">
                    <div className="song-info">
                      <h3>{song.title}</h3>
                      <p>{song.artist}</p>
                    </div>
                    <span className="song-duration">{song.duration}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-songs">No songs found for "{searchTerm}"</div>
          )}
        </div>

        <div className="now-playing">
          {currentSong ? (
            <>
              <div className="album-art">
                <img src={Atifff} alt={currentSong.title} />
              </div>
              <h2 className="song-title">{currentSong.title}</h2>
              <p className="song-artist">{currentSong.artist}</p>

              <div className="player-controls">
                <div className="time-display">
                  <span className="time">{formatTime(currentTime)}</span>
                  <span className="time">{currentSong.duration}</span>
                </div>
                <div className="progress-container">
                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="progress-bar"
                  />
                  <div className="progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="playback-controls">
                  <button onClick={skipToPrevious} className="control-button"><SkipBack size={24} /></button>
                  <button onClick={togglePlay} className="play-button">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button onClick={skipToNext} className="control-button"><SkipForward size={24} /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>No song selected</p>
              <p>Select a song from the list to play</p>
            </div>
          )}
        </div>
      </div>
        <style jsx>{`
        /* Global styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Main container */
        .container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #000;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        /* Header styles */
        .header {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #333;
        }

        .back-button {
          margin-right: 16px;
          cursor: pointer;
        }

        .header-info {
          flex: 1;
        }

        .artist-title {
          font-size: 24px;
          font-weight: bold;
        }

        .song-count {
          font-size: 14px;
          color: #999;
        }

        .search-container {
          position: relative;
        }

        .search-input {
          background-color: #333;
          border-radius: 9999px;
          padding: 8px 16px;
          padding-right: 40px;
          width: 256px;
          font-size: 14px;
          color: #fff;
          border: none;
          outline: none;
        }

        .search-icon {
          position: absolute;
          right: 12px;
          top: 10px;
          width: 16px;
          height: 16px;
          color: #999;
        }

        /* Main content */
        .content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* Song list */
        .song-list {
          width: 50%;
          overflow-y: auto;
          border-right: 1px solid #333;
        }

        .song-item {
          padding: 16px;
          cursor: pointer;
        }

        .song-item:hover {
          background-color: #333;
        }

        .song-item.active {
          background-color: #333;
        }

        .song-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .song-info h3 {
          font-weight: 500;
        }

        .song-info p {
          font-size: 14px;
          color: #999;
        }

        .song-duration {
          font-size: 14px;
          color: #999;
        }

        .no-songs {
          padding: 16px;
          color: #999;
        }

        /* Now playing */
        .now-playing {
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px;
        }

        .album-art {
          width: 256px;
          height: 256px;
          background-color: #444;
          border-radius: 6px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .album-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 6px;
        }

        .song-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 4px;
        }

        .song-artist {
          color: #999;
          margin-bottom: 24px;
        }

        .player-controls {
          width: 100%;
          max-width: 448px;
        }

        .time-display {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .time {
          font-size: 14px;
          color: #999;
        }

        .progress-container {
          width: 100%;
          position: relative;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background-color: #444;
          border-radius: 9999px;
          appearance: none;
          cursor: pointer;
          outline: none;
        }

        .progress-bar::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background-color: #fff;
          border-radius: 50%;
          cursor: pointer;
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          background-color: #1DB954;
          border-radius: 9999px;
          pointer-events: none;
        }

        .playback-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 32px;
          gap: 32px;
        }

        .control-button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .control-button:hover {
          color: #ccc;
        }

        .play-button {
          padding: 12px;
          background-color: #fff;
          color: #000;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .play-button:hover {
          transform: scale(1.05);
        }

        .empty-state {
          text-align: center;
          color: #999;
        }

        .empty-state p:first-child {
          margin-bottom: 16px;
        }
      `}</style>
    </div>

  )
}
