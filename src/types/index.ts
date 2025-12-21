export interface Location {
  id: string;
  name: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  phoneRaw: string;
  phoneLabel?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PracticeArea {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image?: string;
  bio: string;
  isDeceased?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  published: boolean;
  authorId?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  bunnyVideoId: string;
  thumbnailUrl?: string;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  caseDescription?: string;
  howDidYouHear?: string;
  read: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}
