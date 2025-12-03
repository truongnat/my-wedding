import { Camera, Heart, Play } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';

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

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Camera className="h-6 w-6 text-pink-500" />
            <Heart className="h-4 w-4 text-red-500" />
          </div>
          <h2 className="mb-4 text-pink-600">Our Wedding Videos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Relive the magic of our special day through these beautiful video memories
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {videoTypes.map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type ? 'bg-pink-500 hover:bg-pink-600' : ''}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedVideo(video.id)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
                <Badge className="absolute top-2 left-2 bg-white/90 text-pink-600">
                  {video.type}
                </Badge>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-gray-800">{video.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${weddingVideos.find((v) => v.id === selectedVideo)?.embedId}?autoplay=1`}
                  title="Wedding Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <h3 className="mb-2">{weddingVideos.find((v) => v.id === selectedVideo)?.title}</h3>
                <p className="text-gray-600">
                  {weddingVideos.find((v) => v.id === selectedVideo)?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
