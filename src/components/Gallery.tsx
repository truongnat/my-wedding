import { Camera, Download, Heart, Share } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/image-with-fallback';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1638763757006-94414ab2ccf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZSUyMG1vZGVybnxlbnwxfHx8fDE3NTg5Njc1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Engagement Photo 1',
      category: 'engagement',
    },
    {
      src: 'https://images.unsplash.com/photo-1578152973978-1aa7a58c6113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMG1vZGVybiUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzU4OTY3NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Wedding Flowers',
      category: 'details',
    },
    {
      src: 'https://images.unsplash.com/photo-1739216906046-afc47ed589fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc1ODk2NzU5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Wedding Rings',
      category: 'details',
    },
    {
      src: 'https://images.unsplash.com/photo-1747320108113-94390018fcb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBvdXRkb29yJTIwbW9kZXJufGVufDF8fHx8MTc1ODk2NzU5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Wedding Venue',
      category: 'venue',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of moments from our journey together. More photos will be added after the
            wedding!
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setSelectedImage(image.src)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-60 sm:h-72 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="text-white"
                >
                  <Camera className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">View Photo</p>
                </motion.div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm capitalize">
                {image.category}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Photo Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-rose-500 to-blue-500 rounded-2xl p-4 sm:p-6 lg:p-8 text-white text-center"
        >
          <Camera className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-4" />
          <h3 className="mb-4 text-lg sm:text-xl lg:text-2xl">Share Your Photos</h3>
          <p className="mb-6 opacity-90 text-sm sm:text-base">
            Captured a special moment? Upload your photos to our shared album and help us remember
            every detail of our special day!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-2 mx-auto sm:mx-0"
            >
              <Camera className="w-5 h-5" />
              Upload Photos
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full hover:bg-white/30 transition-colors flex items-center gap-2 mx-auto sm:mx-0"
            >
              <Share className="w-5 h-5" />
              Share Album
            </motion.button>
          </div>
        </motion.div>

        {/* Fun Photo Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { number: '500+', label: 'Photos Expected', emoji: '📸' },
            { number: '12', label: 'Professional Shots', emoji: '🎨' },
            { number: '∞', label: 'Memories Made', emoji: '💕' },
            { number: '1', label: 'Perfect Day', emoji: '✨' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl mb-2 bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={selectedImage}
              alt="Selected photo"
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <Download className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
