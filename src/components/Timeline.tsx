import { Cake, Camera, Clock, Coffee, Heart, Music, Music2, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

export function Timeline() {
  const events = [
    {
      time: '3:30 PM',
      title: 'Guest Arrival',
      description: 'Welcome drinks and mingling',
      icon: Coffee,
      color: 'from-blue-500 to-blue-600',
    },
    {
      time: '4:00 PM',
      title: 'Ceremony Begins',
      description: "The moment we've all been waiting for",
      icon: Heart,
      color: 'from-rose-500 to-rose-600',
    },
    {
      time: '4:30 PM',
      title: 'Photo Session',
      description: 'Capturing memories with family and friends',
      icon: Camera,
      color: 'from-purple-500 to-purple-600',
    },
    {
      time: '5:30 PM',
      title: 'Cocktail Hour',
      description: 'Drinks, appetizers, and live acoustic music',
      icon: Music,
      color: 'from-green-500 to-green-600',
    },
    {
      time: '7:00 PM',
      title: 'Reception Dinner',
      description: 'Three-course meal with wine pairings',
      icon: Utensils,
      color: 'from-orange-500 to-orange-600',
    },
    {
      time: '8:30 PM',
      title: 'Speeches & Toasts',
      description: 'Heartfelt words from family and friends',
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
    },
    {
      time: '9:00 PM',
      title: 'Cake Cutting',
      description: 'Sweet moments and even sweeter cake',
      icon: Cake,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      time: '9:30 PM',
      title: 'First Dance',
      description: 'Our first dance as husband and wife',
      icon: Music2,
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      time: '10:00 PM',
      title: 'Dancing & Celebration',
      description: 'Dance the night away until midnight',
      icon: Music,
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section id="timeline" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
            Wedding Day Timeline
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here's how our special day will unfold. Don't worry about watching the clock - just
            enjoy every moment!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 via-purple-300 to-blue-300" />

          <div className="space-y-8">
            {events.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Content Card */}
                  <div
                    className={`md:w-1/2 ml-16 md:ml-0 ${
                      isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative"
                    >
                      {/* Arrow pointing to timeline */}
                      <div
                        className={`absolute top-1/2 transform -translate-y-1/2 w-0 h-0 hidden md:block ${
                          isEven
                            ? 'right-0 translate-x-full border-l-8 border-l-white border-y-8 border-y-transparent'
                            : 'left-0 -translate-x-full border-r-8 border-r-white border-y-8 border-y-transparent'
                        }`}
                      />

                      <div className="flex items-center gap-3 mb-3">
                        <div className={`bg-gradient-to-r ${event.color} p-2 rounded-full`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className={`text-xl font-semibold bg-gradient-to-r ${event.color} bg-clip-text text-transparent`}
                        >
                          {event.time}
                        </span>
                      </div>

                      <h3 className="mb-2 text-gray-800">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 z-10"
                  >
                    <div
                      className={`w-6 h-6 bg-gradient-to-r ${event.color} rounded-full border-4 border-white shadow-lg`}
                    />
                  </motion.div>

                  {/* Mobile time display */}
                  <div className="absolute left-16 md:hidden">
                    <span
                      className={`text-sm bg-gradient-to-r ${event.color} bg-clip-text text-transparent font-semibold`}
                    >
                      {event.time}
                    </span>
                  </div>

                  {/* Spacer for desktop layout */}
                  <div className="md:w-1/2 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-2 rounded-full">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-rose-800">Important Notes</h3>
            </div>
            <ul className="space-y-2 text-rose-700">
              <li>• Ceremony starts promptly at 4:00 PM</li>
              <li>• Cocktail attire requested</li>
              <li>• Unplugged ceremony - no phones during vows</li>
              <li>• Dancing continues until midnight</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full">
                <Music className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-blue-800">Entertainment</h3>
            </div>
            <ul className="space-y-2 text-blue-700">
              <li>• Live acoustic duo during cocktail hour</li>
              <li>• DJ and dance floor from 9:30 PM</li>
              <li>• Photo booth with digital sharing</li>
              <li>• Late night snack bar</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
