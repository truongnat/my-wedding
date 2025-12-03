import { Calendar, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/image-with-fallback';

export function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24"
    >
      {/* Animated background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-blue-50"
      />

      {/* Floating shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-rose-200/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-32 right-4 sm:right-16 w-20 h-20 sm:w-32 sm:h-32 bg-blue-200/30 rounded-full blur-sm"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-full mb-6"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-rose-700">We're Getting Married!</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-4"
            >
              <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
                Sarah & Alex
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Join us as we celebrate our love story and begin our journey as one. A modern
              celebration of timeless love.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center lg:justify-start mb-8"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                <span className="text-base sm:text-lg">September 15, 2024</span>
              </div>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-base sm:text-lg">Oakwood Manor</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-6 sm:px-8 py-3 rounded-full hover:shadow-lg transition-shadow w-full sm:w-auto"
              >
                RSVP Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-full hover:bg-gray-50 transition-colors w-full sm:w-auto"
              >
                View Details
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <motion.div
              animate={{ rotate: [0, 1, -1, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative z-10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1638763757006-94414ab2ccf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNvdXBsZSUyMG1vZGVybnxlbnwxfHx8fDE3NTg5Njc1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Sarah and Alex"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Floating hearts */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute -top-4 -right-4 text-4xl"
            >
              💕
            </motion.div>
            <motion.div
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1,
              }}
              className="absolute -bottom-2 -left-4 text-3xl"
            >
              💖
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
