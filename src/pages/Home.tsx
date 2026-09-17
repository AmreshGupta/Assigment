import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* ── Spare parts data ── */
const row1 = [
  {
    label: 'Headlights',
    bg: '#FEF9E7',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <ellipse cx="11" cy="20" rx="9" ry="14" fill="#FCD34D" opacity="0.5" />
        <path d="M14 20 L36 12 L36 28 Z" fill="#FCD34D" />
        <ellipse cx="36" cy="20" rx="3" ry="8" fill="#F59E0B" />
      </svg>
    ),
  },
  {
    label: 'Brakes',
    bg: '#FEF2F2',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#EF4444" strokeWidth="3" />
        <circle cx="20" cy="20" r="8" stroke="#EF4444" strokeWidth="2" />
        <circle cx="20" cy="20" r="4" fill="#EF4444" />
      </svg>
    ),
  },
  {
    label: 'Alternators',
    bg: '#F0FDF4',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <circle cx="20" cy="20" r="13" fill="#BBF7D0" />
        <path d="M20 8 L23 17 L32 17 L25 23 L28 32 L20 26 L12 32 L15 23 L8 17 L17 17 Z" fill="#16A34A" />
      </svg>
    ),
  },
  {
    label: 'Tyres',
    bg: '#F9FAFB',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <circle cx="20" cy="20" r="15" fill="#374151" />
        <circle cx="20" cy="20" r="10" fill="#6B7280" />
        <circle cx="20" cy="20" r="5" fill="#D1D5DB" />
      </svg>
    ),
  },
  {
    label: 'Suspension',
    bg: '#EDE9FE',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <rect x="17" y="4" width="6" height="32" rx="3" fill="#C4B5FD" opacity="0.4" />
        <rect x="14" y="8" width="12" height="5" rx="2.5" fill="#7C3AED" />
        <rect x="14" y="16" width="12" height="5" rx="2.5" fill="#7C3AED" />
        <rect x="14" y="24" width="12" height="5" rx="2.5" fill="#7C3AED" />
      </svg>
    ),
  },
];

const row2 = [
  {
    label: 'Steering',
    bg: '#E0F2FE',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#0284C7" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="4" fill="#0284C7" />
        <line x1="20" y1="6" x2="20" y2="16" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="6" y1="20" x2="16" y2="20" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="24" y1="20" x2="34" y2="20" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Engine Oil',
    bg: '#FFF7ED',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <path d="M15 8 H25 Q28 8 28 12 V30 Q28 34 24 34 H16 Q12 34 12 30 V12 Q12 8 15 8Z" fill="#FED7AA" />
        <path d="M15 8 H25 L27 12 H13 Z" fill="#F97316" />
        <rect x="18" y="4" width="4" height="6" rx="2" fill="#F97316" />
      </svg>
    ),
  },
  {
    label: 'Mirrors',
    bg: '#F0FDFA',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <ellipse cx="20" cy="18" rx="13" ry="10" fill="#99F6E4" opacity="0.5" />
        <ellipse cx="20" cy="18" rx="13" ry="10" stroke="#0D9488" strokeWidth="2.5" />
        <rect x="18" y="28" width="4" height="8" rx="2" fill="#0D9488" />
      </svg>
    ),
  },
  {
    label: 'Battery',
    bg: '#ECFDF5',
    icon: (
      <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
        <rect x="6" y="14" width="28" height="18" rx="3" fill="#D1FAE5" />
        <rect x="6" y="14" width="28" height="18" rx="3" stroke="#059669" strokeWidth="2" />
        <rect x="12" y="10" width="6" height="6" rx="2" fill="#059669" />
        <rect x="22" y="10" width="6" height="6" rx="2" fill="#059669" />
      </svg>
    ),
  },
  {
    label: 'See All',
    bg: '#F1F5F9',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#64748B" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

/* ── Bottom nav items ── */
const navItems = [
  {
    id: 'home', label: 'Home', path: '/home',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill={active ? 'white' : 'none'} stroke={active ? 'white' : '#9CA3AF'} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H14v-6H10v6H4a1 1 0 01-1-1V9.75z" />
      </svg>
    ),
  },
  {
    id: 'service', label: 'Service', path: '/service',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={active ? '#0D1B3E' : '#9CA3AF'} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'wishlist', label: 'Wallet', path: '/wishlist',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={active ? '#0D1B3E' : '#9CA3AF'} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6m0 0h18" />
      </svg>
    ),
  },
  {
    id: 'profile', label: 'Profile', path: '/profile',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke={active ? '#0D1B3E' : '#9CA3AF'} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

/* ── Part card ── */
const PartBtn = ({ label, bg, icon }: { label: string; bg: string; icon: React.ReactNode }) => (
  <button style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '6px', padding: '10px 6px 8px', borderRadius: '14px',
    backgroundColor: bg, border: 'none', cursor: 'pointer',
    flex: '1 0 0', minWidth: 0,
  }}>
    <div style={{ width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <span style={{ fontSize: '10px', fontWeight: '500', color: '#374151', textAlign: 'center', lineHeight: 1.2 }}>
      {label}
    </span>
  </button>
);

/* ── Home component ── */
const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F6FA',
      fontFamily: 'Inter, sans-serif',
      width: '100%',
      position: 'relative',
      paddingBottom: '80px',
    }}>

      {/* ── HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0D1B3E 0%, #1A3A7C 100%)',
        padding: '44px 20px 20px',
        borderBottomLeftRadius: '28px',
        borderBottomRightRadius: '28px',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          {/* User info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #FBBF24, #F97316)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: '700', fontSize: '18px',
              }}>D</div>
              <div style={{
                position: 'absolute', bottom: '1px', right: '1px',
                width: '11px', height: '11px', backgroundColor: '#22C55E',
                borderRadius: '50%', border: '2px solid #0D1B3E',
              }} />
            </div>
            <div>
              <p style={{ color: 'white', fontWeight: '700', fontSize: '15px', margin: 0 }}>David Gupta</p>
              <p style={{ color: '#93C5FD', fontSize: '11px', margin: 0 }}>⭐ Ultan nagar, New Delhi</p>
            </div>
          </div>

          {/* Right icon buttons - rounded squares like mockup */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              width: '38px', height: '38px', borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
            <button style={{
              width: '38px', height: '38px', borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          backgroundColor: 'white', borderRadius: '12px',
          padding: '11px 14px',
        }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search parts, services..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: '13px', color: '#374151',
              backgroundColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <button style={{
            width: '32px', height: '32px', backgroundColor: '#0D1B3E',
            borderRadius: '8px', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Carousel dots ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', padding: '16px 0 8px' }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{
            width: i === 0 ? '20px' : '6px',
            height: '6px',
            borderRadius: '3px',
            backgroundColor: i === 0 ? '#0D1B3E' : '#D1D5DB',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>

      {/* ── SPARE PARTS ── */}
      <div style={{ padding: '4px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#0D1B3E' }}>Spare Parts</span>
        </div>

        {/* Row 1: 5 items */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          {row1.map((p) => <PartBtn key={p.label} {...p} />)}
        </div>

        {/* Row 2: 5 items */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {row2.map((p) => <PartBtn key={p.label} {...p} />)}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <div style={{ padding: '18px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#0D1B3E' }}>Featured Products</span>
          <button style={{
            width: '30px', height: '30px', borderRadius: '50%',
            backgroundColor: '#0D1B3E', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>

        {/* 3 grey placeholder cards - exactly like mockup */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              flex: 1,
              height: '110px',
              backgroundColor: '#E5E7EB',
              borderRadius: '12px',
            }} />
          ))}
        </div>
      </div>

      {/* ── BOTTOM NAV ── */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 16px 14px',
        zIndex: 50,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                padding: '8px 20px',
                backgroundColor: active ? '#0D1B3E' : 'transparent',
                borderRadius: '14px',
                border: 'none', cursor: 'pointer',
                minWidth: '64px',
              }}
            >
              {item.icon(active)}
              <span style={{
                fontSize: '10px', fontWeight: '600',
                color: active ? 'white' : '#9CA3AF',
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Home;
