import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LanguageSelect: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<'english' | 'hindi'>('english');

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '40px 32px 48px',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Center content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {/* Car + Mechanic Illustration */}
        <div style={{ marginBottom: '48px' }}>
          <svg viewBox="0 0 300 200" width="280" height="190" xmlns="http://www.w3.org/2000/svg">
            {/* Ground shadow */}
            <ellipse cx="150" cy="188" rx="130" ry="8" fill="#E8EEF7" />
            {/* Car body */}
            <rect x="40" y="115" width="170" height="55" rx="12" fill="#1A3A7C" />
            {/* Car roof */}
            <path d="M70 115 Q90 78 132 75 Q165 73 195 80 Q215 87 220 115Z" fill="#2359BE" />
            {/* Windows */}
            <path d="M82 112 Q98 87 128 85 Q150 84 168 89 Q185 95 195 112Z" fill="#93C5FD" opacity="0.85" />
            {/* Window divider */}
            <line x1="132" y1="85" x2="134" y2="112" stroke="#1A3A7C" strokeWidth="3" />
            {/* Door line */}
            <line x1="140" y1="115" x2="140" y2="170" stroke="#122d6e" strokeWidth="1.5" opacity="0.5" />
            {/* Wheels */}
            <circle cx="88" cy="170" r="24" fill="#1E293B" />
            <circle cx="88" cy="170" r="16" fill="#475569" />
            <circle cx="88" cy="170" r="7" fill="#CBD5E1" />
            <circle cx="192" cy="170" r="24" fill="#1E293B" />
            <circle cx="192" cy="170" r="16" fill="#475569" />
            <circle cx="192" cy="170" r="7" fill="#CBD5E1" />
            {/* Headlight */}
            <rect x="208" y="130" width="14" height="10" rx="3" fill="#FCD34D" />
            {/* Tail light */}
            <rect x="38" y="132" width="6" height="10" rx="2" fill="#EF4444" />
            {/* Mechanic figure */}
            <circle cx="258" cy="98" r="16" fill="#FBBF24" />
            {/* Mechanic hair */}
            <path d="M244 96 Q250 84 258 82 Q266 84 272 96" fill="#1F2937" />
            {/* Mechanic body */}
            <rect x="244" y="114" width="28" height="42" rx="6" fill="#1A3A7C" />
            {/* Arms */}
            <rect x="232" y="118" width="14" height="30" rx="5" fill="#1A3A7C" />
            <rect x="272" y="118" width="14" height="30" rx="5" fill="#1A3A7C" />
            {/* Hands */}
            <circle cx="239" cy="148" r="6" fill="#FBBF24" />
            <circle cx="279" cy="148" r="6" fill="#FBBF24" />
            {/* Legs */}
            <rect x="248" y="154" width="10" height="28" rx="4" fill="#374151" />
            <rect x="262" y="154" width="10" height="28" rx="4" fill="#374151" />
            {/* Wrench in hand */}
            <rect x="228" y="143" width="20" height="5" rx="2.5" fill="#9CA3AF" transform="rotate(-25 228 143)" />
            {/* Tool box */}
            <rect x="22" y="152" width="34" height="24" rx="4" fill="#F59E0B" />
            <rect x="28" y="146" width="22" height="9" rx="3" fill="#D97706" />
            {/* Tool box handle */}
            <rect x="35" y="142" width="8" height="6" rx="3" fill="#B45309" />
          </svg>
        </div>

        {/* Language Options */}
        <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* English */}
          <button
            onClick={() => setSelected('english')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '2px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {/* Radio button */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: `3px solid ${selected === 'english' ? '#E53935' : '#9CA3AF'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              backgroundColor: selected === 'english' ? '#E53935' : 'transparent',
              boxShadow: selected === 'english' ? '0 0 0 3px white inset' : 'none',
            }}>
              {selected === 'english' && (
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                }} />
              )}
            </div>
            <span style={{
              fontSize: '17px',
              fontWeight: '600',
              color: '#1F2937',
            }}>English</span>
          </button>

          {/* Hindi */}
          <button
            onClick={() => setSelected('hindi')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '2px solid #E5E7EB',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {/* Radio button */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: `3px solid ${selected === 'hindi' ? '#E53935' : '#9CA3AF'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              backgroundColor: selected === 'hindi' ? '#E53935' : 'transparent',
              boxShadow: selected === 'hindi' ? '0 0 0 3px white inset' : 'none',
            }}>
              {selected === 'hindi' && (
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                }} />
              )}
            </div>
            <span style={{
              fontSize: '17px',
              fontWeight: '600',
              color: '#1F2937',
            }}>हिंदी</span>
          </button>
        </div>
      </div>

      {/* Next Button */}
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <button
          onClick={() => navigate('/role')}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#0D1B3E',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Next
        </button>
        <div style={{
          width: '120px',
          height: '4px',
          backgroundColor: '#0D1B3E',
          borderRadius: '2px',
          margin: '20px auto 0',
        }} />
      </div>
    </div>
  );
};

export default LanguageSelect;
