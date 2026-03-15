import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, Settings, PlayCircle } from 'lucide-react';

export default function Setup() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('Frontend Developer');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  
  const topics = ['Frontend Developer', 'Backend Developer', 'System Design', 'Behavioral HR'];
  const difficulties = ['Entry Level', 'Intermediate', 'Senior'];

  useEffect(() => {
    // Attempt to access camera on load
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (e) {
      console.error("Error accessing media devices.", e);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const handleStart = () => {
    // Navigate to interview page and pass configs, usually via state or context
    navigate('/interview', { state: { topic, difficulty } });
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
         <h1 className="animate-fade-in">Configure Your <span className="gradient-text">Interview</span></h1>
         <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>Select your role and ensure your equipment is ready.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* Configuration Panel */}
        <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
             <Settings size={20} color="#a855f7" />
             <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Interview Settings</h2>
          </div>
          
          <div className="form-group">
            <label className="form-label">Role / Topic</label>
            <select 
              className="form-input" 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              {topics.map(t => <option key={t} value={t} style={{background: '#1e293b', color: 'white'}}>{t}</option>)}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Difficulty Level</label>
             <select 
              className="form-input" 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              {difficulties.map(d => <option key={d} value={d} style={{background: '#1e293b', color: 'white'}}>{d}</option>)}
            </select>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
            onClick={handleStart}
            disabled={!cameraActive}
          >
            <PlayCircle size={20} /> Start Interview
          </button>
          {!cameraActive && (
            <p style={{ color: 'var(--warning)', fontSize: '0.875rem', marginTop: '1rem', textAlign: 'center' }}>
              Please allow camera and microphone access to begin.
            </p>
          )}
        </div>

        {/* Equipment Check Panel */}
        <div className="glass-panel animate-fade-in" style={{ animationDelay: '0.3s', display: 'flex', flexDirection: 'column' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
             <Camera size={20} color="#10b981" />
             <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Equipment Check</h2>
          </div>
          
          <div style={{ 
            flex: 1, 
            background: '#000', 
            borderRadius: 'var(--border-radius-sm)', 
            overflow: 'hidden',
            position: 'relative',
            minHeight: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transform: 'scaleX(-1)', // Mirror effect
                display: cameraActive ? 'block' : 'none'
              }} 
            />
            {!cameraActive && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                 <Camera size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                 <p style={{ margin: 0 }}>Detecting camera...</p>
              </div>
            )}

            {/* Mic Indicator Overlay */}
            {cameraActive && (
               <div style={{
                 position: 'absolute',
                 bottom: '1rem',
                 right: '1rem',
                 background: 'rgba(0,0,0,0.6)',
                 backdropFilter: 'blur(4px)',
                 padding: '0.5rem 1rem',
                 borderRadius: '20px',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '0.5rem'
               }}>
                 <Mic size={16} color="var(--success)" className="animate-pulse-glow" />
                 <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Mic Active</span>
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
