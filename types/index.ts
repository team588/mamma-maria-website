// Sanity Content Types for Mamma Maria Website

export interface HeroSection {
  _id: string;
  _type: 'heroSection';
  title: string;
  subtitle: string;
  backgroundImage?: {
    asset: {
      url: string;
    };
  };
  ctaButton?: {
    text: string;
    url: string;
  };
}

export interface MenuItem {
  _id: string;
  _type: 'menuItem';
  name: string;
  category: 'breakfast' | 'coffee' | 'daily' | 'panini' | 'salad' | 'pizza' | 'dessert' | 'drinks';
  description?: string;
  price: number;
  image?: {
    asset: {
      url: string;
    };
  };
  tags?: string[];
  available?: boolean;
}

export interface Testimonial {
  _id: string;
  _type: 'testimonial';
  name: string;
  text: string;
  rating: number;
  avatar?: {
    asset: {
      url: string;
    };
  };
}

export interface FAQItem {
  _id: string;
  _type: 'faqItem';
  question: string;
  answer: string;
  order: number;
}

export interface ContactInfo {
  _id: string;
  _type: 'contactInfo';
  phone: string;
  email: string;
  address: string;
  hours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}
