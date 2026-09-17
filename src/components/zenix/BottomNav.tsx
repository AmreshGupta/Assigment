import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? '#1A3A7C' : 'none'}
        stroke={active ? '#1A3A7C' : '#9CA3AF'} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H14v-6H10v6H4a1 1 0 01-1-1V9.75z"/>
      </svg>
    ),
  },
  {
    id: 'service',
    label: 'Service',
    path: '/service',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"
        stroke={active ? '#1A3A7C' : '#9CA3AF'} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    path: '/wishlist',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? '#1A3A7C' : 'none'}
        stroke={active ? '#1A3A7C' : '#9CA3AF'} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? '#1A3A7C' : 'none'}
        stroke={active ? '#1A3A7C' : '#9CA3AF'} strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
      </svg>
    ),
  },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-2xl shadow-gray-200/80
      max-w-md mx-auto">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200
                ${active ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              {item.icon(active)}
              <span className={`text-xs font-medium transition-colors
                ${active ? 'text-[#1A3A7C]' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {active && (
                <div className="w-1 h-1 bg-[#1A3A7C] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
