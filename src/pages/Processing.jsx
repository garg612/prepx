import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Cpu, ShieldCheck, Database } from 'lucide-react';

export default function Processing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);

  const tasks = [
    { name: 'Transcribing Audio (Speech-to-Text)', icon: Database, color: '#3b82f6' },
    { name: 'Analyzing NLP semantics & sentiment', icon: BrainCircuit, color: '#a855f7' },
    { name: 'Extracting Facial Expressions (Emotion AI)', icon: ShieldCheck, color: '#10b981' },
    { name: 'Computing Final Employability Score', icon: Cpu, color: '#f59e0b' }
  ];

  useEffect(() => {
    // Simulate processing time
    const duration = 5000; // 5 seconds total processing simulation
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      // Update current task text based on progress
      if (newProgress < 25) setCurrentTask(0);
      else if (newProgress < 50) setCurrentTask(1);
      else if (newProgress < 85) setCurrentTask(2);
      else setCurrentTask(3);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Navigate to a mock report ID
        setTimeout(() => navigate('/report/new-123'), 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [navigate]);

  const Icon = tasks[currentTask].icon;

  return (
    <div className="page-wrapper" style={{ justifyContent: 'center', background: '#000', color: 'white' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px', width: '100%', padding: '2rem' }}>
        
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          background: `rgba(${tasks[currentTask].color === '#3b82f6' ? '59,130,246' : tasks[currentTask].color === '#a855f7' ? '168,85,247' : tasks[currentTask].color === '#10b981' ? '16,185,129' : '245,158,11'}, 0.2)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem auto',
          position: 'relative',
          transition: 'all 0.5s ease'
        }}>
          {/* Animated rings */}
          <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: `2px dashed ${tasks[currentTask].color}`, animation: 'spin 10s linear infinite', opacity: 0.5 }} />
          <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: `1px solid ${tasks[currentTask].color}`, animation: 'spin 15s linear infinite reverse', opacity: 0.3 }} />
          
          <Icon size={48} color={tasks[currentTask].color} className="animate-pulse-glow" />
        </div>

        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
        
        <h2 style={{ marginBottom: '0.5rem' }}>AI Evaluation Engine</h2>
        <p style={{ color: tasks[currentTask].color, fontWeight: 600, height: '24px', transition: 'color 0.3s', marginBottom: '2rem' }}>
          {tasks[currentTask].name}...
        </p>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: 'var(--primary-gradient)',
            transition: 'width 0.1s linear'
          }} />
        </div>
        
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
          {Math.floor(progress)}% Complete
        </div>

      </div>
    </div>
  );
}
