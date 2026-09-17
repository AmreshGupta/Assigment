import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelect: React.FC = () => {
  const navigate = useNavigate();

  const btnStyle = {
    width: '100%',
    padding: '17px 20px',
    backgroundColor: '#FFFFFF',
    color: '#0D1B3E',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '10px',
    border: '2px solid #0D1B3E',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center' as const,
    letterSpacing: '0.3px',
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '48px 32px 48px',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Top: ZENIX logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '900',
          color: '#0D1B3E',
          letterSpacing: '4px',
          margin: 0,
        }}>
          ZENIX
        </h1>
        {/* Underline */}
        <div style={{
          width: '60px',
          height: '3px',
          backgroundColor: '#0D1B3E',
          borderRadius: '2px',
        }} />
      </div>

      {/* Middle: Title + Buttons */}
      <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <p style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#374151',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '0.5px',
        }}>
          Join as ........
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <button style={btnStyle} onClick={() => navigate('/login')}>
            Delivery Partner
          </button>
          <button style={btnStyle} onClick={() => navigate('/login')}>
            Pickup &amp; Drop
          </button>
          <button style={btnStyle} onClick={() => navigate('/login')}>
            Towing Service
          </button>
        </div>
      </div>

      {/* Bottom: Get Started */}
      <div style={{ width: '100%', maxWidth: '300px' }}>
        <button
          onClick={() => navigate('/login')}
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
          Get Started
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

export default RoleSelect;
