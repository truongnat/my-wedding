import { Calendar, Clock, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card } from './ui/card';

export function CountdownTimer() {
  const weddingDate = new Date('2024-12-15T16:00:00'); // Thay đổi ngày đám cưới của bạn
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const distance = weddingDate.getTime() - now;

      if (distance < 0) {
        setIsExpired(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  if (isExpired) {
    return (
      <section className="py-16 bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Heart className="h-8 w-8 text-red-500 animate-pulse" />
            <Calendar className="h-6 w-6 text-pink-500" />
          </div>
          <h2 className="mb-4 text-pink-600">We're Married!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thank you for sharing in our joy. Our wedding day has passed, but our love story
            continues forever!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-pink-100 to-purple-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-6 w-6 text-pink-500" />
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
          </div>
          <h2 className="mb-4 text-pink-600">Countdown to Our Big Day</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every second brings us closer to the beginning of our forever
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-pink-200 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 text-pink-600">
                {timeLeft.days}
              </div>
              <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">Days</div>
            </Card>

            <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 text-purple-600">
                {timeLeft.hours}
              </div>
              <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">
                Hours
              </div>
            </Card>

            <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-pink-200 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 text-pink-600">
                {timeLeft.minutes}
              </div>
              <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">
                Minutes
              </div>
            </Card>

            <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl md:text-4xl lg:text-5xl mb-2 text-purple-600">
                {timeLeft.seconds}
              </div>
              <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">
                Seconds
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-2">
              Wedding Date:{' '}
              {weddingDate.toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-gray-500">
              {weddingDate.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
