'use client';

import { ArrowDownUp, ArrowRight, Bell, BookOpen, Check, Compass, Heart, Library, LogOut, Menu, Plus, Search, Send, User } from 'lucide-react';
import type { Reader } from '@/types/books';

type HeaderProps = {
  user: Reader | null;
  searchInput: string;
  hasUnreadNotifications: boolean;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onNavigate: (page: string) => void;
  onListBook: () => void;
  onSignIn: () => void;
  onToggleMenu: () => void;
};

export function WorkspaceHeader({
  user, searchInput, hasUnreadNotifications, onSearchChange, onSearch,
  onNavigate, onListBook, onSignIn, onToggleMenu,
}: HeaderProps) {
  return (
    <header className="topbar">
      <a className="brand" href="#" onClick={(event) => { event.preventDefault(); onNavigate('discover'); }}>
        <span className="brand-mark"><BookOpen size={18} /></span>
        <span>book<span className="brand-light">swap</span></span>
      </a>
      <form className="top-search" onSubmit={(event) => { event.preventDefault(); onSearch(); }}>
        <Search size={17} />
        <input placeholder="Find your next favourite…" value={searchInput} onChange={(event) => onSearchChange(event.target.value)} />
        <kbd>↵</kbd>
      </form>
      <div className="top-actions">
        <button className="icon-button notification-button" aria-label="Notifications" onClick={() => onNavigate('notifications')}>
          <Bell size={19} />{hasUnreadNotifications && <i />}
        </button>
        <button className="list-cta" onClick={onListBook}><Plus size={16} /> List a book</button>
        {user
          ? <button className="avatar" onClick={() => onNavigate('profile')} aria-label="Profile">{user.name?.[0]?.toUpperCase()}</button>
          : <button className="signin-button" onClick={onSignIn}>Sign in <ArrowRight size={14} /></button>}
        <button className="icon-button mobile-menu" aria-label="Open menu" onClick={onToggleMenu}><Menu size={21} /></button>
      </div>
    </header>
  );
}

type SidebarProps = {
  user: Reader | null;
  page: string;
  wishlistCount: number;
  pendingIncomingCount: number;
  hasUnreadNotifications: boolean;
  mobileNav: boolean;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  onSignIn: () => void;
};

export function WorkspaceSidebar({
  user, page, wishlistCount, pendingIncomingCount, hasUnreadNotifications,
  mobileNav, onNavigate, onSignOut, onSignIn,
}: SidebarProps) {
  const itemClass = (key: string) => `nav-item ${page === key ? 'active' : ''}`;

  return (
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="side-label">YOUR SPACE</div>
      <button className={itemClass('discover')} onClick={() => onNavigate('discover')}><Compass size={18} /> Discover <span className="nav-count">✳</span></button>
      <button className={itemClass('wishlist')} onClick={() => onNavigate('wishlist')}><Heart size={18} /> Wishlist <span className="nav-number">{wishlistCount || ''}</span></button>
      <button className={itemClass('shelf')} onClick={() => onNavigate('shelf')}><Library size={18} /> My bookshelf</button>
      <div className="side-divider" />
      <div className="side-label">EXCHANGES</div>
      <button className={itemClass('incoming')} onClick={() => onNavigate('incoming')}><ArrowDownUp size={17} /> Incoming{pendingIncomingCount > 0 && <span className="nav-badge">{pendingIncomingCount}</span>}</button>
      <button className={itemClass('outgoing')} onClick={() => onNavigate('outgoing')}><Send size={16} /> Sent requests</button>
      <button className={itemClass('history')} onClick={() => onNavigate('history')}><Check size={17} /> Exchange history</button>
      <div className="side-divider" />
      <div className="side-label">ACCOUNT</div>
      <button className={itemClass('profile')} onClick={() => user ? onNavigate('profile') : onSignIn()}><User size={17} /> My profile</button>
      <button className={itemClass('notifications')} onClick={() => onNavigate('notifications')}><Bell size={17} /> Notifications{hasUnreadNotifications && <span className="notification-dot" />}</button>

      <div className="sidebar-bottom">
        <div className="community-card"><span className="community-icon">✴</span><div><b>A little book love</b><p>Every swap gives a story a new home.</p></div></div>
        {user ? (
          <div className="user-strip">
            <button className="user-profile-button" onClick={() => onNavigate('profile')}>
              <span className="avatar small">{user.name?.[0]?.toUpperCase()}</span>
              <span className="user-detail"><b>{user.name}</b><small>{user.location || 'Reader & book lover'}</small></span>
            </button>
            <button className="signout" aria-label="Sign out" onClick={onSignOut}><LogOut size={16} /></button>
          </div>
        ) : (
          <div className="guest-card"><span className="guest-avatar"><User size={16} /></span><div><b>Make yourself at home</b><small>Sign in to start swapping.</small></div><button onClick={onSignIn}>Join <ArrowRight size={13} /></button></div>
        )}
      </div>
    </aside>
  );
}
