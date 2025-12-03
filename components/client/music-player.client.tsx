'use client';

import { Minimize2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/src/components/ui/button';
import { Slider } from '@/src/components/ui/slider';

const weddingSongs = [
  {
    title: 'Wedding March',
    artist: 'Classical',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Replace with your music URL
  },
  {
    title: 'Canon in D',
    artist: 'Pachelbel',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Replace with your music URL
  },
  {
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Replace with your music URL
  },
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Replace with your music URL
  },
  {
    title: 'All of Me',
    artist: 'John Legend',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Replace with your music URL
  },
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true); // Auto-start playing
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.3]); // Lower default volume
  const [currentSong, setCurrentSong] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setCurrentSong((prev) => (prev + 1) % weddingSongs.length);
      setIsPlaying(true);
    };

    const handleCanPlay = () => {
      if (hasUserInteracted && isPlaying) {
        audio.play().catch(console.error);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [hasUserInteracted, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume[0];
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && hasUserInteracted) {
      if (isPlaying) {
        audio.play().catch(console.error);
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, hasUserInteracted]);

  // Auto-start music when component mounts (after user interaction)
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    setHasUserInteracted(true);
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % weddingSongs.length);
  };

  const previousSong = () => {
    setCurrentSong((prev) => (prev - 1 + weddingSongs.length) % weddingSongs.length);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTime = (time: number) => {
    if (Number.isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 w-16 h-16 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg z-50 cursor-pointer hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        onClick={toggleMinimize}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMinimize();
          }
        }}
        aria-label="Expand music player"
      >
        <audio
          ref={audioRef}
          src={weddingSongs[currentSong].url}
          preload="metadata"
          loop={false}
          aria-label={`Now playing: ${weddingSongs[currentSong].title} by ${weddingSongs[currentSong].artist}`}
        />

        <div className="relative">
          {isPlaying ? (
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse group-hover:scale-110 transition-transform" />
            </div>
          ) : (
            <Play className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
          )}
        </div>

        {/* Expand hint */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Expand
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-4 right-4 w-80 max-w-sm bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4 z-50 transition-all duration-300"
      role="region"
      aria-label="Music player"
    >
      <audio
        ref={audioRef}
        src={weddingSongs[currentSong].url}
        preload="metadata"
        loop={false}
        aria-label={`Now playing: ${weddingSongs[currentSong].title} by ${weddingSongs[currentSong].artist}`}
      />

      {/* Minimize Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMinimize}
        className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-gray-100"
        aria-label="Minimize music player"
      >
        <Minimize2 className="h-3 w-3" />
      </Button>

      {/* Main Player Controls */}
      <div className="flex items-center gap-3 mb-3 pr-8">
        <Button
          variant="outline"
          size="sm"
          onClick={previousSong}
          className="h-8 w-8 p-0"
          aria-label="Previous song"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={togglePlay}
          className="h-8 w-8 p-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={nextSong}
          className="h-8 w-8 p-0"
          aria-label="Next song"
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        <div className="flex-1 min-w-0">
          <div className="truncate font-medium text-sm" aria-label="Song title">
            {weddingSongs[currentSong].title}
          </div>
          <div className="truncate text-xs text-gray-600" aria-label="Artist name">
            {weddingSongs[currentSong].artist}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="h-8 w-8 p-0"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-gray-500 w-10" aria-label="Current time">
          {formatTime(currentTime)}
        </span>
        <div
          className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
          role="progressbar"
          aria-valuenow={duration ? (currentTime / duration) * 100 : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Playback progress"
        >
          <div
            className="h-full bg-pink-500 transition-all duration-300"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 w-10" aria-label="Duration">
          {formatTime(duration)}
        </span>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2 mb-3">
        <Volume2 className="h-3 w-3 text-gray-400" aria-hidden="true" />
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={1}
          step={0.1}
          className="flex-1"
          aria-label="Volume control"
        />
      </div>

      {/* Song Indicators */}
      <div className="flex gap-1" role="tablist" aria-label="Song selection">
        {weddingSongs.map((song, index) => (
          <button
            key={index}
            onClick={() => setCurrentSong(index)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              index === currentSong ? 'bg-pink-500' : 'bg-gray-300'
            }`}
            role="tab"
            aria-selected={index === currentSong}
            aria-label={`Play ${song.title}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {!hasUserInteracted && (
        <div className="text-xs text-gray-500 text-center mt-2" role="status">
          🎵 Click anywhere to start playing music
        </div>
      )}
    </div>
  );
}
