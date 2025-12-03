import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/src/styles/globals.css';
import { Providers } from './providers';

// Configure Google Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  title: {
    default: 'Our Wedding - Join Us for Our Special Day',
    template: '%s | Our Wedding',
  },
  description:
    'Join us as we celebrate our wedding day. Find all the details about our ceremony, reception, and how to RSVP.',
  keywords: [
    'wedding',
    'wedding invitation',
    'wedding ceremony',
    'wedding reception',
    'RSVP',
    'wedding celebration',
  ],
  authors: [{ name: 'Wedding Couple' }],
  creator: 'Wedding Couple',
  publisher: 'Wedding Couple',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Our Wedding - Join Us for Our Special Day',
    description:
      'Join us as we celebrate our wedding day. Find all the details about our ceremony, reception, and how to RSVP.',
    siteName: 'Our Wedding',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Our Wedding',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Wedding - Join Us for Our Special Day',
    description:
      'Join us as we celebrate our wedding day. Find all the details about our ceremony, reception, and how to RSVP.',
    images: ['/images/twitter-image.jpg'],
    creator: '@weddingcouple',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
