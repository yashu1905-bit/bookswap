import type { Book } from '@/types/books';
import { API_BASE } from './api';

export const genres = [
  'All genres', 'Fiction', 'Fantasy', 'Mystery', 'Romance', 'Sci-fi',
  'Non-fiction', 'Biography', 'History', 'Self-help', 'Poetry', 'Children',
];

export const coverColors = ['#e4dbca', '#edd3c6', '#d7e0d2', '#dce2e8', '#f1dfbd', '#e7d8e8', '#d4e3e1'];

export const sampleCovers = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=550&q=80',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=550&q=80',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=550&q=80',
  'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=550&q=80',
  'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?auto=format&fit=crop&w=550&q=80',
];

export function getCoverUrl(book: Book): string {
  if (book.image?.startsWith('http')) return book.image;
  if (book.image) return `${API_BASE.replace(/\/api$/, '')}${book.image}`;
  return sampleCovers[(book.title?.length || 0) % sampleCovers.length];
}
