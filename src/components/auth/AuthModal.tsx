import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bot } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Validation status
  const isLengthValid = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>\-_=+\\\/\[\]]/.test(password);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormInvalid = isRegister && (
    !isEmailValid || 
    !isLengthValid || 
    !hasUpper || 
    !hasLower || 
    !hasNumber || 
    !hasSpecial
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side pre-submit verification
    if (isRegister) {
      if (!isEmailValid) {
        setError('Please enter a valid email address.');
        return;
      }
      if (isFormInvalid) {
        setError('Please satisfy all password complexity requirements.');
        return;
      }
    }

    setLoading(true);

    try {
      if (isRegister) {
        await register(email, password, fullName);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      const detail = err.response?.data?.detail;
      if (typeof detail === 'string') {
        setError(detail);
      } else if (Array.isArray(detail)) {
        // Handle Pydantic list errors (422)
        const messages = detail.map((d: any) => d.msg.replace('Value error, ', '')).join(', ');
        setError(messages);
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Bot size={28} color="#fff" />
          </div>
          <h2 className="auth-title">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="auth-subtitle">
            {isRegister ? 'Register to start your desktop AI assistant' : 'Sign in to access your desktop conversations'}
          </p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="user@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderColor: isRegister && email.length > 0 && !isEmailValid ? 'rgba(239, 68, 68, 0.4)' : undefined
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderColor: isRegister && password.length > 0 && isFormInvalid ? 'rgba(239, 68, 68, 0.4)' : undefined
              }}
            />
            {isRegister && (
              <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>Password Requirements:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '11px' }}>
                  <div style={{ color: isLengthValid ? 'var(--status-connected)' : 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{isLengthValid ? '✓' : '•'}</span> At least 8 chars
                  </div>
                  <div style={{ color: hasUpper ? 'var(--status-connected)' : 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{hasUpper ? '✓' : '•'}</span> Uppercase letter
                  </div>
                  <div style={{ color: hasLower ? 'var(--status-connected)' : 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{hasLower ? '✓' : '•'}</span> Lowercase letter
                  </div>
                  <div style={{ color: hasNumber ? 'var(--status-connected)' : 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{hasNumber ? '✓' : '•'}</span> Number (0-9)
                  </div>
                  <div style={{ color: hasSpecial ? 'var(--status-connected)' : 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{hasSpecial ? '✓' : '•'}</span> Special char
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '12px', padding: '12px' }}
            disabled={loading || isFormInvalid}
          >
            {loading ? 'Processing...' : isRegister ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <div className="auth-toggle">
          <span>{isRegister ? 'Already have an account?' : "Don't have an account?"}</span>
          <button
            type="button"
            className="auth-toggle-btn"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
          >
            {isRegister ? 'Sign In' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};
