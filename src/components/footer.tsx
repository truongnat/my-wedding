import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-rose-50 to-blue-50 py-12"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-rose-500" />
          <span className="text-lg font-semibold">Sarah & Alex</span>
          <Heart className="w-5 h-5 text-rose-500" />
        </div>
        <p className="text-gray-600 mb-2">September 15, 2024</p>
        <p className="text-gray-500 text-sm">Made with love and code</p>
      </div>
    </motion.footer>
  );
}
