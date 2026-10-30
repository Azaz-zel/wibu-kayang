export interface Member {
  id: number;
  code: string;
  name: string;
  handle: string;
  role: string;
  category: 'founder' | 'gamer' | 'lore' | string;
  fav: string;
  quote: string;
  avatar: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: number;
  code: string;
  title: string;
  description: string;
  date: string;
  spanSize: 'normal' | 'wide' | string;
  img: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Story {
  id: number;
  code: string;
  title: string;
  author: string;
  tag: string;
  date: string;
  content: string;
  img: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SettingsMap {
  [key: string]: string;
}

export interface LightboxData {
  id: string;
  title: string;
  desc: string;
  date: string;
  img: string;
}
