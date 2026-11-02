'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';
import { api, errorMessage } from '@/lib/api';
import type { Book, Reader, Review } from '@/types/books';

type ProfilePageProps = {
  user: Reader | null;
  books: Book[];
  onSignIn: () => void;
  onSaved: () => void;
  onMessage: (message: string) => void;
};

export default function ProfilePage({ user, books, onSignIn, onSaved, onMessage }: ProfilePageProps) {
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    setName(user?.name || '');
    setBio(user?.bio || '');
    setLocation(user?.location || '');

    if (user) {
      api<{ reviews: Review[] }>('/users/me')
        .then((data) => setReviews(data.reviews || []))
        .catch(() => setReviews([]));
    }
  }, [user]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await api('/users/me', {
        method: 'PATCH',
        body: JSON.stringify({ name, bio, location }),
      });
      onSaved();
      onMessage('Your profile is up to date.');
    } catch (error) {
      onMessage(errorMessage(error));
    }
  }

  return (
    <section className="inner-page">
      <div className="eyebrow muted">THE READER BEHIND THE BOOKS</div>
      <h2>My <em>profile.</em></h2>
      <p className="page-intro">Tell the community a little about yourself.</p>

      {user ? (
        <div className="profile-card">
          <span className="profile-avatar">{user.name?.[0]?.toUpperCase()}</span>
          <form className="form-stack" onSubmit={saveProfile}>
            <label>Your name<input value={name} onChange={(event) => setName(event.target.value)} maxLength={60} /></label>
            <label>Your area<input value={location} onChange={(event) => setLocation(event.target.value)} maxLength={100} placeholder="Your neighbourhood" /></label>
            <label>A little about you<textarea rows={4} value={bio} onChange={(event) => setBio(event.target.value)} maxLength={400} placeholder="What do you love reading?" /></label>
            <button className="primary-button">Save my profile <Check size={15} /></button>
          </form>

          <div className="profile-stats">
            <div><b>{books.length}</b><small>Books shared</small></div>
            <div><b>{reviews.length}</b><small>Kind words</small></div>
            <div>
              <b>{reviews.length ? `${(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)} ★` : '✳'}</b>
              <small>{reviews.length ? 'Average rating' : 'Book lover'}</small>
            </div>
          </div>

          {reviews.length > 0 && (
            <div className="profile-reviews">
              <h3>Kind words from readers</h3>
              {reviews.slice(0, 5).map((review) => (
                <div className="review-row" key={review._id}>
                  <span className="review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  <span>{review.text || 'A lovely exchange.'}</span>
                  <small>— {review.author?.name || 'Reader'}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Your profile is waiting.</h3>
          <p>Sign in to make a little space for yourself in the community.</p>
          <button className="primary-button" onClick={onSignIn}>Sign in <ArrowRight size={15} /></button>
        </div>
      )}
    </section>
  );
}
