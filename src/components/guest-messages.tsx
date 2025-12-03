import { Heart, MessageCircle, Send, Star } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface GuestMessage {
  id: number;
  name: string;
  message: string;
  rating: number;
  timestamp: string;
  relationship: string;
}

const initialMessages: GuestMessage[] = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    message:
      'Chúc hai bạn trăm năm hạnh phúc! Tình yêu của các bạn thật đẹp và tôi rất vui được chứng kiến ngày đặc biệt này.',
    rating: 5,
    timestamp: '2 giờ trước',
    relationship: 'Bạn thân',
  },
  {
    id: 2,
    name: 'Trần Thị Lan',
    message: 'Cưới rồi mà vẫn ngọt ngào như ngày đầu. Chúc hai bạn luôn hạnh phúc bên nhau nhé!',
    rating: 5,
    timestamp: '1 ngày trước',
    relationship: 'Đồng nghiệp',
  },
  {
    id: 3,
    name: 'Lê Hoàng Nam',
    message:
      'Tôi đã biết hai bạn từ lúc mới quen nhau, và thấy tình yêu của các bạn lớn dần mỗi ngày. Chúc mừng!',
    rating: 5,
    timestamp: '3 ngày trước',
    relationship: 'Bạn học',
  },
];

export function GuestMessages() {
  const [messages, setMessages] = useState<GuestMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState({
    name: '',
    message: '',
    rating: 5,
    relationship: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name.trim() || !newMessage.message.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const message: GuestMessage = {
        id: Date.now(),
        name: newMessage.name,
        message: newMessage.message,
        rating: newMessage.rating,
        timestamp: 'Vừa xong',
        relationship: newMessage.relationship || 'Khách mời',
      };

      setMessages([message, ...messages]);
      setNewMessage({ name: '', message: '', rating: 5, relationship: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="h-6 w-6 text-blue-500" />
            <Heart className="h-4 w-4 text-red-500" />
          </div>
          <h2 className="mb-4 text-blue-600">Lời Chúc Từ Bạn Bè</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những lời chúc tốt đẹp từ những người thân yêu làm cho ngày cưới của chúng tôi thêm ý
            nghĩa
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Add Message Form */}
          <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm">
            <h3 className="mb-4 text-center">Gửi Lời Chúc Của Bạn</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Tên của bạn"
                  value={newMessage.name}
                  onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                  required
                />
                <Input
                  placeholder="Mối quan hệ (bạn bè, đồng nghiệp...)"
                  value={newMessage.relationship}
                  onChange={(e) => setNewMessage({ ...newMessage, relationship: e.target.value })}
                />
              </div>

              <Textarea
                placeholder="Lời chúc của bạn dành cho cô dâu chú rể..."
                value={newMessage.message}
                onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                className="min-h-[100px]"
                required
              />

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Đánh giá:</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewMessage({ ...newMessage, rating: i + 1 })}
                      className="p-1"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          i < newMessage.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang gửi...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Gửi Lời Chúc
                  </div>
                )}
              </Button>
            </form>
          </Card>

          {/* Messages List */}
          <div className="space-y-4">
            {messages.map((message) => (
              <Card
                key={message.id}
                className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 bg-gradient-to-br from-blue-400 to-purple-500">
                    <AvatarFallback className="text-white">
                      {message.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-gray-800">{message.name}</h4>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-blue-600">{message.relationship}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{message.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(message.rating)}
                    </div>

                    <p className="text-gray-700 leading-relaxed">{message.message}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {messages.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
