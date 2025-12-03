import { Coffee, Heart, Music, Plane } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutSection() {
  const storyMilestones = [
    {
      year: '2019',
      title: 'First Met',
      description:
        'At a coffee shop downtown, two tech enthusiasts discovered their shared love for innovation.',
      icon: Coffee,
    },
    {
      year: '2020',
      title: 'First Date',
      description:
        'A virtual reality gaming session that lasted until 3 AM. We knew we had found our player 2.',
      icon: Music,
    },
    {
      year: '2022',
      title: 'Moved In',
      description:
        'Built our smart home together, complete with automated everything and way too many gadgets.',
      icon: Heart,
    },
    {
      year: '2023',
      title: 'The Proposal',
      description:
        'Alex created a custom app that led Sarah through their favorite memories, ending with "Will you marry me?"',
      icon: Plane,
    },
  ];

  return (
    <section id="story" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
            Our Love Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two developers, countless commits, and one perfect merge. Here's how our repository of
            love grew from a simple "Hello World" to a full-stack relationship.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-rose-300 to-blue-300 h-full hidden lg:block" />

          <div className="space-y-12">
            {storyMilestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:gap-8`}
                >
                  {/* Content */}
                  <div
                    className={`lg:w-1/2 ${isEven ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'} text-center lg:text-left`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-center gap-3 mb-3 justify-center lg:justify-start">
                        <div className="bg-gradient-to-r from-rose-500 to-blue-500 p-2 rounded-full">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-semibold text-gray-800">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="mb-2 text-gray-800">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </motion.div>
                  </div>

                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-rose-500 to-blue-500 rounded-full border-4 border-white shadow-lg hidden lg:block z-10"
                  />

                  {/* Mobile timeline indicator */}
                  <div className="lg:hidden w-full flex justify-center mb-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-blue-500 rounded-full" />
                  </div>

                  {/* Spacer for desktop */}
                  <div className="lg:w-1/2 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Fun facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {[
            { number: '1,247', label: 'GitHub commits together', emoji: '💻' },
            { number: '42', label: 'Countries on our bucket list', emoji: '🌍' },
            { number: '∞', label: 'Cups of coffee shared', emoji: '☕' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="text-4xl mb-2">{stat.emoji}</div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
