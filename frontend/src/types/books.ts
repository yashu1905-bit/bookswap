export type ReaderSummary = {
  _id?: string;
  id?: string;
  name?: string;
  avatar?: string;
  location?: string;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  condition: string;
  description: string;
  image: string;
  location: string;
  owner: any;
  available: boolean;
  createdAt: string;
};

export type Reader = ReaderSummary & {
  email: string;
  bio: string;
};

export type Exchange = {
  _id: string;
  status: string;
  requester: any;
  owner: any;
  requestedBook: Book;
  offeredBook: Book;
  message: string;
  updatedAt: string;
};

export type Review = {
  _id: string;
  rating: number;
  text: string;
  author?: ReaderSummary;
};
