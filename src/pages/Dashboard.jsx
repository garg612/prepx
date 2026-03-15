import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, TrendingUp, Clock, Award, ChevronRight } from 'lucide-react';
import NeuralNetwork from '../components/NeuralNetwork';

export default function Dashboard() {
  const navigate = useNavigate();

  // Mock data representing previous interviews
  const history = [
    { id: 1, role: 'Frontend Developer', date: '2 days ago', score: 85 },
    { id: 2, role: 'System Design', date: '1 week ago', score: 72 },
    { id: 3, role: 'Behavioral', date: '2 weeks ago', score: 91 },
  ];

  return (
    <div className="container" style={{ padding: '3rem 2rem', position: 'relative' }}>
      <NeuralNetwork />
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div>
          <h1 className="animate-fade-in">Welcome back, <span className="gradient-text">Alex</span></h1>
          <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>Ready to improve your interview skills today?</p>
        </div>
        <button 
          className="btn btn-primary animate-pulse-glow" 
          onClick={() => navigate('/setup')}
          style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
        >
          <Play fill="currentColor" size={20} /> New Interview
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Quick Stats */}
        <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--border-radius-sm)', color: '#3b82f6' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Average Score</h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Across all sessions</p>
            </div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>82<span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/100</span></div>
        </div>

        <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--border-radius-sm)', color: '#10b981' }}>
              <Clock size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Total Practice Time</h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Hours practicing</p>
            </div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>4.5<span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>h</span></div>
        </div>

        <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--border-radius-sm)', color: '#f59e0b' }}>
              <Award size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Strongest Trait</h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Based on AI analysis</p>
            </div>
          </div>
           <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white', marginTop: '0.5rem' }}>Confidence</div>
        </div>
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h2>Recent Sessions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {history.map(item => (
            <div 
              key={item.id}
              className="glass-panel" 
              style={{ 
                padding: '1.5rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onClick={() => navigate(`/report/${item.id}`)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <h3 style={{ margin: 0 }}>{item.role}</h3>
                <p style={{ margin: 0, fontSize: '0.875rem' }}>{item.date}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: item.score > 80 ? 'var(--success)' : 'var(--warning)' }}>
                    {item.score}/100
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Overall Score</div>
                </div>
                <ChevronRight color="var(--text-secondary)" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
