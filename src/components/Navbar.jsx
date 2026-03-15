import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { useAuth } from '../AuthProvider';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  // Don't show navbar on the interview or processing screens to keep them immersive
  if (['/interview', '/processing'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div
        className="brand"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
      >
        <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--primary)' }}>
          Prepx
        </span>
      </div>

      {!isAuthenticated ? (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => navigate('/auth')} style={{ borderRadius: '50px', padding: '0.6rem 1.5rem', fontWeight: 600 }}>Sign In</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/dashboard')} style={{ borderRadius: '50px' }}>Dashboard</button>
          <button className="btn btn-primary" onClick={() => navigate('/setup')} style={{ borderRadius: '50px', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}>Start Practice</button>
          <button className="btn btn-outline" onClick={() => { logout(); navigate('/auth'); }} style={{ borderRadius: '50px' }}>Logout</button>
        </div>
      )}
    </nav>
  );
}
