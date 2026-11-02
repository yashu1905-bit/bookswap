import type { Book } from '@/types/books';
import { coverColors, getCoverUrl } from '@/lib/bookCatalog';

type BookCoverProps = {
  book: Book;
  className?: string;
};

export function BookCover({ book, className = '' }: BookCoverProps) {
  const backgroundColor = coverColors[(book.title?.length || 1) % coverColors.length];

  return (
    <div className={`cover ${className}`} style={{ backgroundColor }}>
      {book.image ? (
        <img src={getCoverUrl(book)} alt={book.title} />
      ) : (
        <>
          <span className="cover-eyebrow">{book.genre || 'A GOOD READ'}</span>
          <span className="cover-title">{book.title}</span>
          <span className="cover-author">{book.author}</span>
          <span className="cover-rule" />
        </>
      )}
    </div>
  );
}
