'use client';

import { Calendar, Clock, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { WEDDING_DATE } from '@/lib/constants';
import { calculateTimeRemaining } from '@/lib/utils';
import { Card } from '@/src/components/ui/card';
import type { TimeRemaining } from '@/types';

export function CountdownTimer() {
  // Initialize with null to prevent hydration mismatch
  const [timeLeft, setTimeLeft] = useState<TimeRemaining | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Calculate initial time on mount (client-side only)
    const updateTimeLeft = () => {
      const remaining = calculateTimeRemaining(WEDDING_DATE);
      setTimeLeft(remaining);

      // Check if the wedding date has passed
      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        const now = Date.now();
        if (WEDDING_DATE.getTime() < now) {
          setIsExpired(true);
        }
      }
    };

    // Initial calculation
    updateTimeLeft();

    // Update every second
    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show loading state during hydration to prevent mismatch
  if (timeLeft === null) {
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
              {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => (
                <Card
                  key={label}
                  className={`p-6 text-center bg-white/70 backdrop-blur-sm ${
                    index % 2 === 0 ? 'border-pink-200' : 'border-purple-200'
                  } hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`text-3xl md:text-4xl lg:text-5xl mb-2 ${
                      index % 2 === 0 ? 'text-pink-600' : 'text-purple-600'
                    }`}
                  >
                    --
                  </div>
                  <div className="text-sm md:text-base text-gray-600 uppercase tracking-wide">
                    {label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              {WEDDING_DATE.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-gray-500">
              {WEDDING_DATE.toLocaleTimeString('en-US', {
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
