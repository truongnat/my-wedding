'use client';

import { Camera, Heart, Play, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';

const weddingVideos = [
  {
    id: 1,
    title: 'Our Engagement Story',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=300&fit=crop',
    duration: '2:30',
    type: 'Engagement',
    description: 'The magical moment when our love story reached a new chapter',
    embedId: 'dQw4w9WgXcQ', // YouTube video ID placeholder
  },
  {
    id: 2,
    title: 'Wedding Ceremony Highlights',
    thumbnail: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500&h=300&fit=crop',
    duration: '5:45',
    type: 'Ceremony',
    description: 'Relive the most beautiful moments of our wedding day',
    embedId: 'dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'Reception & First Dance',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=500&h=300&fit=crop',
    duration: '3:20',
    type: 'Reception',
    description: 'Dancing the night away with our loved ones',
    embedId: 'dQw4w9WgXcQ',
  },
  {
    id: 4,
    title: 'Behind the Scenes',
    thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&h=300&fit=crop',
    duration: '4:10',
    type: 'Behind the Scenes',
    description: 'Fun moments captured behind the camera',
    embedId: 'dQw4w9WgXcQ',
  },
];

export function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const videoTypes = ['All', 'Engagement', 'Ceremony', 'Reception', 'Behind the Scenes'];

  const filteredVideos =
    filter === 'All' ? weddingVideos : weddingVideos.filter((video) => video.type === filter);

  const closeModal = () => setSelectedVideo(null);

  const selectedVideoData = weddingVideos.find((v) => v.id === selectedVideo);

  return (
    <section
      id="videos"
      className="py-16 bg-gradient-to-br from-pink-50 to-purple-50"
      aria-labelledby="videos-heading"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4" aria-hidden="true">
            <Camera className="h-6 w-6 text-pink-500" />
            <Heart className="h-4 w-4 text-red-500" />
          </div>
          <h2 id="videos-heading" className="mb-4 text-pink-600">
            Our Wedding Videos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Relive the magic of our special day through these beautiful video memories
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-8"
          role="group"
          aria-label="Filter videos by category"
        >
          {videoTypes.map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type ? 'bg-pink-500 hover:bg-pink-600' : ''}
              aria-pressed={filter === type}
              aria-label={`Filter by ${type}`}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Video Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
          aria-label="Wedding videos"
        >
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedVideo(video.id)}
              role="listitem"
            >
              <button
                className="w-full text-left"
                aria-label={`Play video: ${video.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideo(video.id);
                }}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={`Thumbnail for ${video.title}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    <div className="bg-white/90 rounded-full p-3">
                      <Play className="h-6 w-6 text-pink-600" aria-hidden="true" />
                    </div>
                  </div>
                  <Badge className="absolute top-2 left-2 bg-white/90 text-pink-600">
                    {video.type}
                  </Badge>
                  <div
                    className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm"
                    aria-label={`Duration: ${video.duration}`}
                  >
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                </div>
              </button>
            </Card>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && selectedVideoData && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
            aria-describedby="video-modal-description"
          >
            <div
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideoData.embedId}?autoplay=1`}
                  title={selectedVideoData.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  aria-label={`Video player for ${selectedVideoData.title}`}
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Close video player"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="p-6">
                <h3 id="video-modal-title" className="mb-2">
                  {selectedVideoData.title}
                </h3>
                <p id="video-modal-description" className="text-gray-600">
                  {selectedVideoData.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
