import type { Event, WithContext } from 'schema-dts';

export function getWeddingStructuredData(): WithContext<Event> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Our Wedding Celebration',
    description:
      'Join us as we celebrate our wedding day. Find all the details about our ceremony, reception, and how to RSVP.',
    startDate: '2025-06-15T14:00:00-07:00', // Update with actual wedding date
    endDate: '2025-06-15T23:00:00-07:00', // Update with actual wedding end time
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Wedding Venue Name', // Update with actual venue
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Wedding Street', // Update with actual address
        addressLocality: 'City',
        addressRegion: 'State',
        postalCode: '12345',
        addressCountry: 'US',
      },
    },
    image: [`${baseUrl}/images/og-image.jpg`],
    organizer: {
      '@type': 'Person',
      name: 'Wedding Couple', // Update with actual names
    },
    offers: {
      '@type': 'Offer',
      url: baseUrl,
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
  };
}
