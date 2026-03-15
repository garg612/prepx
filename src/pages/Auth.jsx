import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus, LogIn, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useAuth } from '../AuthProvider';
import NeuralNetwork from '../components/NeuralNetwork';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/dashboard');
  };

  return (
    <div className="page-wrapper" style={{ padding: '6rem 2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <NeuralNetwork />
      
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '600px', height: '400px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <h1 className="animate-fade-in" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
          Welcome to <span className="gradient-text">Prepx</span>
        </h1>
        <p className="animate-fade-in" style={{ animationDelay: '0.1s', fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto' }}>
          Sign in to access your dashboard, review your AI feedback, and start practicing.
        </p>
      </div>

      <div 
        className="glass-panel animate-fade-in" 
        style={{ 
          width: '100%', 
          maxWidth: '420px', 
          animationDelay: '0.2s', 
          position: 'relative', 
          zIndex: 1,
          padding: '2.5rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', marginBottom: '2.5rem', gap: '0', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--border-radius-md)', padding: '0.25rem' }}>
          <button 
            style={{ 
              flex: 1, 
              background: isLogin ? 'var(--surface)' : 'transparent',
              border: 'none',
              padding: '0.6rem 1rem',
              color: isLogin ? 'white' : 'var(--text-secondary)',
              borderRadius: 'var(--border-radius-sm)',
              boxShadow: isLogin ? '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
             style={{ 
              flex: 1, 
              background: !isLogin ? 'var(--surface)' : 'transparent',
              border: 'none',
              padding: '0.6rem 1rem',
              color: !isLogin ? 'white' : 'var(--text-secondary)',
              borderRadius: 'var(--border-radius-sm)',
              boxShadow: !isLogin ? '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.95rem',
              transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <div className="form-group" style={{ position: 'relative' }}>
              <User size={18} color="var(--text-secondary)" style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input type="text" className="form-input" placeholder="Full Name" required style={{ paddingLeft: '2.75rem', height: '3rem', background: 'rgba(0,0,0,0.2)' }} />
            </div>
          )}
          <div className="form-group" style={{ position: 'relative' }}>
            <Mail size={18} color="var(--text-secondary)" style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input type="email" className="form-input" placeholder="Email Address" required style={{ paddingLeft: '2.75rem', height: '3rem', background: 'rgba(0,0,0,0.2)' }} />
          </div>
          <div className="form-group" style={{ position: 'relative', marginBottom: '0.5rem' }}>
            <Lock size={18} color="var(--text-secondary)" style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input type="password" className="form-input" placeholder="Password" required style={{ paddingLeft: '2.75rem', height: '3rem', background: 'rgba(0,0,0,0.2)' }} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {isLogin ? (
              <><LogIn size={20} /> Access Dashboard</>
            ) : (
              <><Sparkles size={20} /> Create Account</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
