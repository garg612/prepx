import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, MessageSquare, Download, Share2 } from 'lucide-react';

export default function Report() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    // In a real app, fetch from Evaluation Results DB using id
    // Mocking the data here
    setReport({
      id,
      date: new Date().toLocaleDateString(),
      role: 'Frontend Developer',
      overallScore: 84,
      breakdown: {
        answerCorrectness: 88,
        communication: 82,
        emotionAndConfidence: 75,
        voiceBehavior: 85
      },
      strengths: [
        "Excellent technical depth on React hooks.",
        "Clear and concise explanations.",
        "Good speaking pace, avoiding fillers."
      ],
      weaknesses: [
        "Eye contact dropped significantly during complex questions.",
        "Showed signs of nervousness (fidgeting) at 01:45.",
        "Could provide more concrete examples for behavioral questions."
      ],
      aiAdvice: "Your technical knowledge is highly employable. To improve your overall score, focus on maintaining steady eye contact with the camera and take a deep breath before answering complex architectural questions to reduce visible nervousness."
    });
  }, [id]);

  if (!report) return <div className="page-wrapper"><div className="animate-pulse-glow" style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--primary-gradient)' }} /></div>;

  const getScoreColor = (score) => {
    if (score >= 85) return 'var(--success)';
    if (score >= 70) return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div className="container" style={{ padding: '3rem 2rem' }}>
      
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
         <button 
           className="btn btn-secondary" 
           onClick={() => navigate('/dashboard')}
           style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
         >
           <ArrowLeft size={16} /> Back to Dashboard
         </button>
         <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}><Share2 size={16} /> Share</button>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><Download size={16} /> Download PDF</button>
         </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
         <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.875rem', marginBottom: '1rem' }}>
           Session: {report.id} • {report.date} • {report.role}
         </div>
         <h1 className="animate-fade-in" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            Evaluation <span className="gradient-text">Complete</span>
         </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Overall Score */}
        <div className="glass-panel animate-fade-in" style={{ textAlign: 'center', position: 'sticky', top: '2rem' }}>
           <h3 style={{ color: 'var(--text-secondary)' }}>Employability Score</h3>
           <div style={{ 
             width: '180px', 
             height: '180px', 
             borderRadius: '50%', 
             border: `8px solid ${getScoreColor(report.overallScore)}`,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             margin: '2rem auto',
             boxShadow: `0 0 30px ${getScoreColor(report.overallScore)}40`
           }}>
             <span style={{ fontSize: '4rem', fontWeight: 800 }}>{report.overallScore}</span>
           </div>
           <p>Top 15% of candidates for this role.</p>
           
           <div style={{ marginTop: '3rem', textAlign: 'left' }}>
             <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Score Breakdown</h4>
             {Object.entries(report.breakdown).map(([key, value]) => (
               <div key={key} style={{ marginBottom: '1rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                   <span style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                   <span style={{ fontWeight: 600, color: getScoreColor(value) }}>{value}</span>
                 </div>
                 <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${value}%`, height: '100%', background: getScoreColor(value), borderRadius: '3px' }} />
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Detailed Feedback */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* AI Constructive Advice */}
          <div className="glass-panel" style={{ background: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid #6366f1' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
               <MessageSquare color="#6366f1" size={24} />
               <h3 style={{ margin: 0, color: '#6366f1' }}>AI Coach Feedback</h3>
             </div>
             <p style={{ margin: 0, color: 'white', lineHeight: 1.8 }}>{report.aiAdvice}</p>
          </div>

          {/* Strengths & Weaknesses Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="glass-panel">
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                 <CheckCircle color="var(--success)" size={24} />
                 <h3 style={{ margin: 0 }}>Key Strengths</h3>
               </div>
               <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {report.strengths.map((s, i) => <li key={i} style={{ color: 'var(--text-primary)' }}>{s}</li>)}
               </ul>
            </div>

            <div className="glass-panel">
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                 <AlertTriangle color="var(--warning)" size={24} />
                 <h3 style={{ margin: 0 }}>Areas to Improve</h3>
               </div>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {report.weaknesses.map((w, i) => <li key={i} style={{ color: 'var(--text-primary)' }}>{w}</li>)}
               </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
