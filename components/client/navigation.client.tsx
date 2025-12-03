'use client';

import { motion } from 'framer-motion';
import { Calendar, Camera, Clock, Heart, MapPin, Users } from 'lucide-react';

export function Navigation() {
  const navItems = [
    { name: 'Home', href: '#home', icon: Heart, ariaLabel: 'Navigate to home section' },
    { name: 'Our Story', href: '#story', icon: Heart, ariaLabel: 'Navigate to our story section' },
    {
      name: 'Details',
      href: '#details',
      icon: Calendar,
      ariaLabel: 'Navigate to wedding details section',
    },
    {
      name: 'Location',
      href: '#location',
      icon: MapPin,
      ariaLabel: 'Navigate to location section',
    },
    { name: 'RSVP', href: '#rsvp', icon: Users, ariaLabel: 'Navigate to RSVP section' },
    { name: 'Gallery', href: '#gallery', icon: Camera, ariaLabel: 'Navigate to gallery section' },
    { name: 'Timeline', href: '#timeline', icon: Clock, ariaLabel: 'Navigate to timeline section' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-lg border border-gray-200 max-w-[calc(100vw-2rem)] overflow-x-auto"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 min-w-max">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-full hover:bg-gray-100 transition-colors text-xs sm:text-sm whitespace-nowrap"
              aria-label={item.ariaLabel}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline lg:inline">{item.name}</span>
            </motion.a>
          );
        })}
      </div>
    </motion.nav>
  );
}
