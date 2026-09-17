import React from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '60px 32px 48px',
      fontFamily: 'Inter, sans-serif',
      backgroundImage: 'none',
    }}>
      {/* Top spacer */}
      <div />

      {/* Center: Logo + Brand */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        {/* Gear Logo */}
        <div style={{
          width: '140px',
          height: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg viewBox="0 0 140 140" width="140" height="140" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer gear teeth */}
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
              <rect
                key={i}
                x="63"
                y="4"
                width="14"
                height="16"
                rx="3"
                fill="#0D1B3E"
                transform={`rotate(${angle} 70 70)`}
              />
            ))}
            {/* Outer ring */}
            <circle cx="70" cy="70" r="55" fill="#0D1B3E" />
            <circle cx="70" cy="70" r="48" fill="white" />
            <circle cx="70" cy="70" r="40" fill="#0D1B3E" />
            {/* Inner spoke holes */}
            {[0,60,120,180,240,300].map((angle, i) => (
              <ellipse
                key={i}
                cx="70"
                cy="44"
                rx="7"
                ry="11"
                fill="white"
                transform={`rotate(${angle} 70 70)`}
              />
            ))}
            <circle cx="70" cy="70" r="14" fill="white" />
            {/* ZENIX text inside gear */}
            <text
              x="70"
              y="76"
              textAnchor="middle"
              fontSize="13"
              fontWeight="900"
              fill="#0D1B3E"
              fontFamily="Inter, sans-serif"
              letterSpacing="2"
            >
              ZENIX
            </text>
          </svg>
        </div>

        {/* Brand text */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '26px',
            fontWeight: '800',
            color: '#0D1B3E',
            letterSpacing: '2px',
            margin: '0 0 4px',
          }}>
            Zenix Automotive
          </h1>
        </div>
      </div>

      {/* Bottom: Get Started Button */}
      <div style={{ width: '100%', maxWidth: '320px' }}>
        <button
          onClick={() => navigate('/language')}
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
            letterSpacing: '0.5px',
          }}
        >
          Get Started
        </button>
        {/* Bottom indicator line */}
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

export default SplashScreen;
