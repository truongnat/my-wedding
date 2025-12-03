import { Car, Clock, MapPin, Navigation, Phone, Train } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';

const venues = [
  {
    id: 'ceremony',
    name: 'Nhà Thờ Đức Bà',
    address: '01 Công xã Paris, Bến Nghé, Quận 1, TP.HCM',
    phone: '028 3822 0477',
    time: '16:00 - 17:30',
    type: 'Lễ Cưới',
    coordinates: { lat: 10.7798, lng: 106.699 },
    description: 'Nơi diễn ra lễ cưới trang trọng của chúng tôi',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
    parking: 'Có bãi đỗ xe miễn phí',
    transport: 'Gần bến xe buýt và ga tàu điện ngầm',
  },
  {
    id: 'reception',
    name: 'Khách Sạn Rex',
    address: '141 Nguyễn Huệ, Bến Nghé, Quận 1, TP.HCM',
    phone: '028 3829 2185',
    time: '18:30 - 22:00',
    type: 'Tiệc Cưới',
    coordinates: { lat: 10.7767, lng: 106.7009 },
    description: 'Nơi tổ chức tiệc cưới và kỷ niệm cùng gia đình, bạn bè',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
    parking: 'Dịch vụ valet parking',
    transport: 'Trung tâm thành phố, dễ dàng di chuyển',
  },
];

export function VenueMap() {
  const [selectedVenue, setSelectedVenue] = useState<string>('ceremony');

  const currentVenue = venues.find((v) => v.id === selectedVenue);

  const openInMaps = (venue: (typeof venues)[0]) => {
    const query = encodeURIComponent(venue.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, '_blank');
  };

  const openDirections = (venue: (typeof venues)[0]) => {
    const query = encodeURIComponent(venue.address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-green-500" />
            <Navigation className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="mb-4 text-green-600">Địa Điểm Tổ Chức</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thông tin chi tiết về địa điểm và cách thức di chuyển đến lễ cưới của chúng tôi
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Venue Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {venues.map((venue) => (
              <Button
                key={venue.id}
                variant={selectedVenue === venue.id ? 'default' : 'outline'}
                onClick={() => setSelectedVenue(venue.id)}
                className={`${
                  selectedVenue === venue.id
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'hover:bg-green-50'
                }`}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {venue.type}
              </Button>
            ))}
          </div>

          {currentVenue && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Venue Details */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {currentVenue.type}
                  </Badge>
                  <h3 className="text-green-700">{currentVenue.name}</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{currentVenue.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-700">{currentVenue.time}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <p className="text-gray-700">{currentVenue.phone}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-gray-400 mt-0.5" />
                    <p className="text-gray-700">{currentVenue.parking}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Train className="h-5 w-5 text-gray-400 mt-0.5" />
                    <p className="text-gray-700">{currentVenue.transport}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 italic">{currentVenue.description}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => openInMaps(currentVenue)}
                    className="bg-blue-500 hover:bg-blue-600 flex-1"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Xem Bản Đồ
                  </Button>
                  <Button
                    onClick={() => openDirections(currentVenue)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Chỉ Đường
                  </Button>
                </div>
              </Card>

              {/* Map Placeholder & Image */}
              <Card className="overflow-hidden bg-white/80 backdrop-blur-sm">
                <div className="relative h-64 lg:h-full min-h-[400px]">
                  <img
                    src={currentVenue.image}
                    alt={currentVenue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="mb-1">{currentVenue.name}</h4>
                    <p className="text-sm text-gray-600">{currentVenue.address}</p>
                  </div>

                  {/* Interactive Map Button */}
                  <Button
                    onClick={() => openInMaps(currentVenue)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800"
                    size="sm"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Bản đồ tương tác
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* All Venues Overview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <Card
                key={venue.id}
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  selectedVenue === venue.id
                    ? 'ring-2 ring-green-500 bg-green-50/50'
                    : 'hover:shadow-lg bg-white/80'
                }`}
                onClick={() => setSelectedVenue(venue.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    variant={selectedVenue === venue.id ? 'default' : 'secondary'}
                    className={selectedVenue === venue.id ? 'bg-green-500' : ''}
                  >
                    {venue.type}
                  </Badge>
                  <h4 className="text-gray-800">{venue.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{venue.address}</p>
                <p className="text-sm text-green-600">{venue.time}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
