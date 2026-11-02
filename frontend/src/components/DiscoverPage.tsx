'use client';

import {
  ArrowRight, BookOpen, ChevronDown, ChevronRight, Heart, MapPin,
  SlidersHorizontal, Sparkles,
} from 'lucide-react';
import { BookCover } from '@/components/BookCover';
import type { Book } from '@/types/books';
import { coverColors } from '@/lib/bookCatalog';

type DiscoverPageProps = {
  books: Book[];
  genres: string[];
  genre: string;
  sort: string;
  loading: boolean;
  error: string;
  savedBookIds: Set<string>;
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  onRetry: () => void;
  onToggleWishlist: (book: Book) => void;
  onSelectBook: (book: Book) => void;
  onListBook: () => void;
  onMessage: (message: string) => void;
};

export default function DiscoverPage({
  books, genres, genre, sort, loading, error, savedBookIds,
  onGenreChange, onSortChange, onClearFilters, onRetry,
  onToggleWishlist, onSelectBook, onListBook, onMessage,
}: DiscoverPageProps) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={13} /> THE COMMUNITY BOOKSHELF</div>
          <h1>Good books<br />deserve <em>another life.</em></h1>
          <p>Find the story you’ve been looking for. Trade one you’ve already loved.</p>
          <button className="hero-button" onClick={() => document.getElementById('book-grid')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore the shelf <ArrowRight size={16} />
          </button>
          <div className="hero-note"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span><span>Shared by <b>2,400+ readers</b> and counting</span></div>
        </div>
        <div className="hero-art">
          <div className="sun-disc" />
          <div className="hero-shelf">
            <div className="hero-book b1"><span>The<br />Secret<br />Garden</span></div>
            <div className="hero-book b2"><span>little<br />women</span></div>
            <div className="hero-book b3"><span>THE<br />NIGHT<br />CIRCUS</span></div>
            <div className="hero-book b4"><span>normal<br />people</span></div>
            <div className="hero-book b5"><span>THE<br />ALCHEMIST</span></div>
          </div>
          <div className="floating-note"><span>✳</span><div>ONE GOOD READ<br /><b>finds another</b></div></div>
          <span className="doodle d1">✳</span><span className="doodle d2">✳</span>
        </div>
      </section>

      <section className="browse-section" id="book-grid">
        <div className="section-heading">
          <div>
            <div className="eyebrow muted">A SHELF THAT GOES AROUND</div>
            <h2>Find your next <em>favourite.</em></h2>
            <p>Real books, from real readers, ready for their next chapter.</p>
          </div>
          <button className="text-link" onClick={onClearFilters}>See everything <ArrowRight size={15} /></button>
        </div>

        <div className="filter-row">
          <div className="genre-chips">
            {genres.slice(0, 8).map((item) => (
              <button key={item} className={`chip ${genre === item ? 'selected' : ''}`} onClick={() => onGenreChange(item)}>{item}</button>
            ))}
            <select className="more-genres" value={genre} onChange={(event) => onGenreChange(event.target.value)} aria-label="More genres">
              <option value="All genres">More genres…</option>
              {genres.slice(8).map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="sort-control">
            <SlidersHorizontal size={15} />
            <select value={sort} onChange={(event) => onSortChange(event.target.value)} aria-label="Sort books">
              <option value="newest">Recently added</option><option value="oldest">Oldest first</option><option value="title">A–Z</option>
            </select>
            <ChevronDown size={14} />
          </div>
        </div>

        {error && !books.length ? (
          <div className="empty-state">
            <span className="empty-icon">☁</span><h3>We couldn’t reach the bookshelf.</h3><p>{error}</p>
            <button className="primary-button" onClick={onRetry}>Try again</button>
            <small>Make sure MongoDB and the BookSwap API are running.</small>
          </div>
        ) : (
          <div className="book-grid" id="books">
            {loading
              ? Array.from({ length: 8 }, (_, index) => <div className="book-skeleton" key={index} />)
              : books.map((book, index) => (
                <article className="book-card" key={book._id}>
                  <button className={`save-button ${savedBookIds.has(book._id) ? 'saved' : ''}`} aria-label="Save to wishlist" onClick={() => onToggleWishlist(book)}>
                    <Heart size={16} fill={savedBookIds.has(book._id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="book-cover-button" onClick={() => onSelectBook(book)}><BookCover book={book} /></button>
                  <div className="book-info">
                    <div className="book-meta"><span>{book.genre}</span><i>·</i><span>{book.condition || 'Good'}</span></div>
                    <button className="book-title" onClick={() => onSelectBook(book)}>{book.title}</button>
                    <p className="book-author">by {book.author}</p>
                    <div className="book-footer">
                      <span className="owner-mini"><span className="owner-initial" style={{ background: coverColors[index % coverColors.length] }}>{(book.owner?.name || 'R')[0]}</span><span>{book.owner?.name || 'Reader'}</span></span>
                      <span className="location"><MapPin size={11} />{book.location || book.owner?.location || 'Nearby'}</span>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        )}

        {!loading && books.length === 0 && !error && <div className="empty-inline"><BookOpen size={24} /><span>No books match yet. Try a different search or category.</span></div>}
        <div className="browse-more"><span>You’re browsing <b>{books.length}</b> lovely reads</span><button className="outline-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top <ChevronRight size={14} /></button></div>
      </section>

      <section className="swap-banner">
        <div className="banner-spark">✳</div><div><span>YOUR BOOKSHELF HAS A STORY TO TELL</span><h3>Ready to pass a good read along?</h3><p>List a book in a minute. Find its next favourite reader.</p></div>
        <button onClick={onListBook}>List your first book <ArrowRight size={16} /></button><div className="banner-doodle">↗</div>
      </section>

      <footer className="footer"><span>© 2026 BookSwap</span><span>Made for the love of a good book <span className="footer-heart">♥</span></span><button onClick={() => onMessage('We’d love to hear from you — hello@bookswap.community')}>Say hello <ArrowRight size={12} /></button></footer>
    </>
  );
}
