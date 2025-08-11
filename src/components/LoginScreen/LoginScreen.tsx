import React, { useState } from 'react';
import { Lock, User, Shield, AlertCircle } from 'lucide-react';
import './LoginScreen.css';

interface LoginScreenProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    // In production, this would call a secure authentication API
    // For demo purposes, we'll use a simple check
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Demo authentication (replace with real auth in production)
      if (username && password.length >= 8) {
        onLogin({ username, password });
      } else {
        setError('Invalid credentials. Password must be at least 8 characters.');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <Shield className="login-logo" size={48} />
          <h1>Nursing Handoff SBAR</h1>
          <p className="login-subtitle">Secure Patient Information System</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <User size={16} />
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={16} />
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="login-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p className="security-notice">
            <Lock size={14} />
            This system contains confidential patient information protected under HIPAA.
            Unauthorized access is prohibited and will be logged.
          </p>
          <p className="session-notice">
            Session will expire after 15 minutes of inactivity.
          </p>
        </div>
      </div>
    </div>
  );
};