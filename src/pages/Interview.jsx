import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mic, StopCircle, PlayCircle, Eye, AlertCircle } from 'lucide-react';

export default function Interview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { topic = 'Interview', difficulty = 'Standard' } = location.state || {};
  
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const videoRef = useRef(null);

  const questions = [
    `Tell me about a time you faced a significant challenge as a ${topic} and how you overcame it.`,
    `How do you handle disagreements with team members regarding ${difficulty.toLowerCase()} technical decisions?`,
    `Explain a complex concept related to ${topic} as if I have no technical background.`
  ];

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRecording) {
      handleNext();
    }
    return () => clearInterval(timer);
  }, [isRecording, timeLeft]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access denied.", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleNext = () => {
    setIsRecording(false);
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setTimeLeft(120);
    } else {
      // Finished all questions, go to processing
      stopCamera();
      navigate('/processing');
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Bar for Interview status */}
      <div style={{ 
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'rgba(15, 23, 42, 0.9)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            background: isRecording ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)', 
            padding: '0.5rem 1rem', 
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {isRecording ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--error)' }} className="animate-pulse-glow" /> : null}
            <span style={{ fontWeight: 600, color: isRecording ? 'var(--error)' : 'white' }}>
              {isRecording ? 'RECORDING' : 'READY'}
            </span>
          </div>
          <span style={{ color: 'var(--text-secondary)' }}>Question {currentQuestionIdx + 1} of {questions.length}</span>
        </div>

        <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'monospace', color: timeLeft <= 30 ? 'var(--error)' : 'white' }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
        
        {/* Video Background (FullScreenish) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
           <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transform: 'scaleX(-1)', // Mirror
              }} 
            />
            {/* Dark overlay to make text readable */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)' }} />
        </div>

        {/* Content Overlay */}
        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          width: '100%', 
          padding: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          
          {/* Mock AI Analysis Overlays */}
          {isRecording && (
             <div className="animate-fade-in" style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '0.75rem 1rem', borderRadius: 'var(--border-radius-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--glass-border)' }}>
                  <Eye size={18} color="#3b82f6" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Eye Contact</div>
                    <div style={{ fontWeight: 600, color: '#3b82f6' }}>Good</div>
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '0.75rem 1rem', borderRadius: 'var(--border-radius-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--glass-border)' }}>
                  <Mic size={18} color="#10b981" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Speaking Pace</div>
                    <div style={{ fontWeight: 600, color: '#10b981' }}>Optimal</div>
                  </div>
                </div>
             </div>
          )}

          {/* Question Panel */}
          <div className="glass-panel animate-fade-in" style={{ 
            background: 'rgba(15, 23, 42, 0.85)', 
            marginBottom: '2rem',
            borderLeft: '4px solid #a855f7'
          }}>
             <h2 style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1.3 }}>
               {questions[currentQuestionIdx]}
             </h2>
             <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
               {!isRecording ? (
                  <button 
                    className="btn btn-primary animate-pulse-glow" 
                    onClick={handleStartRecording}
                    style={{ padding: '1rem 2rem', fontSize: '1.125rem', borderRadius: '30px' }}
                  >
                    <PlayCircle size={24} /> Start Answering
                  </button>
               ) : (
                  <button 
                    className="btn" 
                    onClick={handleNext}
                    style={{ 
                      padding: '1rem 2rem', 
                      fontSize: '1.125rem', 
                      background: 'rgba(239, 68, 68, 0.2)', 
                      color: 'var(--error)',
                      border: '1px solid var(--error)',
                      borderRadius: '30px'
                    }}
                  >
                    <StopCircle size={24} /> Finish Answer
                  </button>
               )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
