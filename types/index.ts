// Core application types

export interface RSVPSubmission {
  id: string;
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  dietaryRestrictions?: string;
  message?: string;
  submittedAt: Date;
}

export interface GuestMessage {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
  approved: boolean;
}

export interface WeddingEvent {
  title: string;
  date: Date;
  location: {
    name: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
