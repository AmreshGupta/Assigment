import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeLogin: React.FC = () => {
  const navigate = useNavigate();

  const loginBtnStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    border: '1.5px solid #D1D5DB',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    fontWeight: '500',
    color: '#1F2937',
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Top section: white bg with ZENIX + illustration + welcome text */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '40px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}>
        {/* ZENIX Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          {/* Gear icon */}
          <svg viewBox="0 0 36 36" width="36" height="36" fill="none">
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
              <rect
                key={i}
                x="15.5"
                y="1"
                width="5"
                height="6"
                rx="1.5"
                fill="#0D1B3E"
                transform={`rotate(${angle} 18 18)`}
              />
            ))}
            <circle cx="18" cy="18" r="14" fill="#0D1B3E" />
            <circle cx="18" cy="18" r="11" fill="white" />
            <circle cx="18" cy="18" r="8" fill="#0D1B3E" />
            {[0,60,120,180,240,300].map((a, i) => (
              <ellipse
                key={i}
                cx="18"
                cy="10"
                rx="2.5"
                ry="4"
                fill="white"
                transform={`rotate(${a} 18 18)`}
              />
            ))}
            <circle cx="18" cy="18" r="3" fill="white" />
          </svg>
          <span style={{
            fontSize: '26px',
            fontWeight: '900',
            color: '#0D1B3E',
            letterSpacing: '3px',
          }}>ZENIX</span>
        </div>

        {/* Illustration: car + mechanic on white bg */}
        <svg viewBox="0 0 280 160" width="260" height="148" xmlns="http://www.w3.org/2000/svg">
          {/* Ground */}
          <ellipse cx="140" cy="152" rx="120" ry="7" fill="#F1F5F9" />
          {/* Car body */}
          <rect x="45" y="100" width="155" height="45" rx="10" fill="#1A3A7C" />
          {/* Roof */}
          <path d="M65 100 Q82 72 118 70 Q148 68 175 75 Q196 82 200 100Z" fill="#2359BE" />
          {/* Windows */}
          <path d="M76 98 Q90 77 116 75 Q140 74 160 80 Q178 87 185 98Z" fill="#BFDBFE" opacity="0.9" />
          <line x1="118" y1="75" x2="120" y2="98" stroke="#1A3A7C" strokeWidth="2.5" />
          {/* Wheels */}
          <circle cx="85" cy="145" r="20" fill="#1E293B" />
          <circle cx="85" cy="145" r="13" fill="#475569" />
          <circle cx="85" cy="145" r="6" fill="#CBD5E1" />
          <circle cx="180" cy="145" r="20" fill="#1E293B" />
          <circle cx="180" cy="145" r="13" fill="#475569" />
          <circle cx="180" cy="145" r="6" fill="#CBD5E1" />
          {/* Headlight */}
          <rect x="196" y="114" width="12" height="8" rx="3" fill="#FCD34D" />
          {/* Mechanic */}
          <circle cx="240" cy="88" r="13" fill="#FBBF24" />
          <rect x="230" y="101" width="20" height="32" rx="5" fill="#F59E0B" />
          <rect x="222" y="106" width="10" height="24" rx="4" fill="#F59E0B" />
          <rect x="248" y="106" width="10" height="24" rx="4" fill="#F59E0B" />
          <rect x="233" y="133" width="8" height="20" rx="4" fill="#374151" />
          <rect x="243" y="133" width="8" height="20" rx="4" fill="#374151" />
          {/* Wrench */}
          <rect x="212" y="112" width="18" height="4" rx="2" fill="#9CA3AF" transform="rotate(-30 212 112)" />
        </svg>

        {/* Welcome Text */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#0D1B3E',
            margin: '0 0 6px',
          }}>
            Welcome To Zenix
          </h1>
          <p style={{
            fontSize: '13px',
            color: '#6B7280',
            margin: 0,
            lineHeight: '1.5',
          }}>
            Your Trusted Platform For Automotive Professionals
          </p>
        </div>
      </div>

      {/* Login buttons section */}
      <div style={{
        padding: '20px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        {/* Continue with Google */}
        <button style={loginBtnStyle} onClick={() => navigate('/home')}>
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span style={{ flex: 1, textAlign: 'center' }}>Continue with Google</span>
        </button>

        {/* Continue with Mail */}
        <button style={loginBtnStyle} onClick={() => navigate('/home')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="3" fill="#EA4335" />
            <path d="M2 7L12 13L22 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ flex: 1, textAlign: 'center' }}>Continue with Mail</span>
        </button>

        {/* Continue with Phone */}
        <button style={loginBtnStyle} onClick={() => navigate('/home')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <rect x="5" y="2" width="14" height="20" rx="3" fill="#25D366" />
            <circle cx="12" cy="18" r="1.5" fill="white" />
            <rect x="9" y="4" width="6" height="1.5" rx="0.75" fill="white" />
          </svg>
          <span style={{ flex: 1, textAlign: 'center' }}>Continue with Phone</span>
        </button>

        {/* Create Account */}
        <p style={{
          textAlign: 'center',
          fontSize: '13px',
          color: '#6B7280',
          margin: '4px 0 0',
        }}>
          New To Zenix ?{' '}
          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563EB',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default WelcomeLogin;
