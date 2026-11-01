import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'BookSwap — good books find new readers', description: 'Give your bookshelf a second life. Swap books with readers in your neighborhood.' };
export const dynamic = 'force-dynamic';
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
