import { AboutSection } from './components/about-section';
import { CountdownTimer } from './components/countdown-timer';
import { Footer } from './components/footer';
import { Gallery } from './components/gallery';
import { GuestMessages } from './components/guest-messages';
import { HeroSection } from './components/hero-section';
import { MusicPlayer } from './components/music-player';
import { Navigation } from './components/navigation';
import { RSVPSection } from './components/rsvp-section';
import { Timeline } from './components/timeline';
import { VenueMap } from './components/venue-map';
import { VideoSection } from './components/video-section';
import { WeddingDetails } from './components/wedding-details';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CountdownTimer />
      <AboutSection />
      <WeddingDetails />
      <VenueMap />
      <Timeline />
      <VideoSection />
      <Gallery />
      <GuestMessages />
      <RSVPSection />
      <Footer />
      <MusicPlayer />
    </div>
  );
}
