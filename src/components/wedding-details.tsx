import { Calendar, Camera, Clock, Gift, MapPin, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/image-with-fallback';

export function WeddingDetails() {
  const details = [
    {
      icon: Calendar,
      title: 'Wedding Date',
      info: 'September 15, 2024',
      description: 'Saturday afternoon celebration',
    },
    {
      icon: Clock,
      title: 'Ceremony Time',
      info: '4:00 PM',
      description: 'Followed by cocktail hour',
    },
    {
      icon: MapPin,
      title: 'Venue',
      info: 'Oakwood Manor',
      description: '123 Garden Lane, Hillsdale',
    },
    {
      icon: Users,
      title: 'Dress Code',
      info: 'Cocktail Attire',
      description: 'Smart casual welcome',
    },
  ];

  return (
    <section id="details" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
            Wedding Details
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our special day. We've made it easy with QR codes and
            digital invites!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {details.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-lg"
                >
                  <div className="bg-gradient-to-r from-rose-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-gray-800">{detail.title}</h3>
                  <p className="text-lg mb-1 text-gray-900">{detail.info}</p>
                  <p className="text-sm text-gray-600">{detail.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Venue Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1747320108113-94390018fcb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBvdXRkb29yJTIwbW9kZXJufGVufDF8fHx8MTc1ODk2NzU5MHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Oakwood Manor Wedding Venue"
              className="w-full rounded-2xl shadow-2xl"
            />

            {/* Floating info cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-rose-500" />
                <span className="text-sm">Photo Ready</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Gift Registry</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-rose-50 to-blue-50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="mb-2 text-gray-800">Getting There</h3>
            <p className="text-gray-600">
              Scan the QR code for directions or click the button below
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            {/* QR Code Placeholder */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center">
                Scan for directions
              </p>
            </motion.div>

            <div className="text-center">
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Or use your favorite map app
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                  Google Maps
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-900 transition-colors text-sm sm:text-base"
                >
                  Apple Maps
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
