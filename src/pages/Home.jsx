import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mic, Sparkles, Clock, BarChart2, MessageSquare, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../AuthProvider';
import NeuralNetwork from '../components/NeuralNetwork';

// Custom hook for scroll-triggered animations
function useScrollReveal(options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: observer.unobserve(entry.target) to animate only once
        }
      });
    }, options);

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [domRef, isVisible];
}

const features = [
  {
    icon: <ShieldCheck size={24} color="white" />,
    title: 'Secure Practice',
    description: 'Your data stays private and everything runs locally in the browser.',
    details: 'Nothing is stored on our servers — your recordings and progress remain in this browser unless you choose to export them.',
  },
  {
    icon: <Mic size={24} color="white" />,
    title: 'Live Voice Feedback',
    description: 'Speak naturally and get real-time feedback on clarity, pace, and confidence.',
    details: 'Our core engine listens to your wording, tone, and speed – then gives you actionable improvement tips instantly.',
  },
  {
    icon: <Sparkles size={24} color="white" />,
    title: 'Smart Evaluation',
    description: 'AI-powered scoring assesses answers, communication, and technical depth.',
    details: 'Scores are based on relevance, structure, and clarity so you can pinpoint what to improve for each mock interview.',
  },
  {
    icon: <Clock size={24} color="white" />,
    title: 'Timed Interview Modes',
    description: 'Practice under pressure with built-in timers and structured session flow.',
    details: 'Choose between quick drills, full mock interviews, or custom rounds to fit your schedule and comfort level.',
  },
  {
    icon: <BarChart2 size={24} color="white" />,
    title: 'Detailed Reports',
    description: 'Track improvement with post-interview analytics and historical trends.',
    details: 'View your progress over time, compare sessions, and flag the skills that need the most focus.',
  },
  {
    icon: <MessageSquare size={24} color="white" />,
    title: 'Guided Q&A',
    description: 'Get smart follow-ups and example answers to help you refine your responses.',
    details: 'After each response, the system suggests better phrasing and follow-up questions to keep you sharp.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [animatedScore, setAnimatedScore] = useState(0);

  // Setup scroll reveals for the three sections
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [stepsRef, stepsVisible] = useScrollReveal();
  const [testimonialsRef, testimonialsVisible] = useScrollReveal();

  useEffect(() => {
    if (featuresVisible) {
      let start = 0;
      const end = 84;
      const duration = 1500;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedScore(end);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [featuresVisible]);

  const fullLine1 = 'Interview smarter.';
  const fullLine2 = 'Practice faster.';

  useEffect(() => {
    let idx1 = 0;
    const timer1 = setInterval(() => {
      if (idx1 < fullLine1.length) {
        setLine1(fullLine1.slice(0, idx1 + 1));
        idx1++;
      } else {
        clearInterval(timer1);
        let idx2 = 0;
        const timer2 = setInterval(() => {
          if (idx2 < fullLine2.length) {
            setLine2(fullLine2.slice(0, idx2 + 1));
            idx2++;
          } else {
            clearInterval(timer2);
          }
        }, 50);
      }
    }, 50); // Adjust speed as needed

    return () => {
      clearInterval(timer1);
    };
  }, []);

  return (
    <div className="page-wrapper" style={{ paddingTop: '6rem', paddingBottom: '4rem', overflowX: 'hidden', position: 'relative' }}>
      
      <NeuralNetwork />
      
      {/* Heavy animated ambient color glows strictly for hero background */}
      <div className="hero-ambient-bg" />

      <div className="page-content" style={{ position: 'relative', zIndex: 5 }}>
        <header className="hero-header" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '4rem', 
          paddingLeft: '1rem', /* Shifted slightly back left */
          maxWidth: '1200px', /* Reduced max-width slightly for tighter centering */
          margin: '0 auto' 
        }}>
          <div className="hero-stack" style={{ flex: '0 1 500px', maxWidth: '500px', zIndex: 2 }}>
            <h1 className="hero-title animate-fade-in" style={{ fontWeight: 'bold' }}>
              {line1}
              <br />
              {line2}
            </h1>
            <p className="animate-fade-in" style={{ animationDelay: '0.1s', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              AI-powered interview training with real-time feedback, guided questions, and performance reports — all in your browser.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary animate-fade-in"
                style={{ 
                  borderRadius: '50px', 
                  padding: '0.9rem 2.2rem', 
                  fontSize: '1.1rem', 
                  fontWeight: '600',
                  boxShadow: '0 8px 24px rgba(255, 255, 255, 0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                  animationDelay: '0.2s'
                }}
                onClick={() => navigate(isAuthenticated ? '/setup' : '/auth')}
              >
                Start Practice
              </button>
              <button
                className="btn btn-secondary animate-fade-in"
                style={{ 
                  borderRadius: '50px', 
                  padding: '0.9rem 2.2rem', 
                  fontSize: '1.1rem', 
                  fontWeight: '600',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                  animationDelay: '0.3s',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                Watch Demo
              </button>
            </div>
          </div>

          <div 
            className="hero-image-container animate-fade-in" 
            style={{ 
               flex: '1 1 500px', 
               display: 'flex', 
               justifyContent: 'center', /* Kept center relative to its flex box, since parent is shifting right */
               alignItems: 'center',
               position: 'relative', 
               animationDelay: '0.3s', 
               zIndex: 1,
               marginTop: '1rem',
               perspective: '1200px',
               marginLeft: '1rem' 
            }}
          >
            {/* Extended glow behind the image for better blending */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '60%', /* Push glow right */
                transform: 'translate(-50%, -50%)',
                width: '130%',
                height: '130%',
                background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.15) 45%, transparent 75%)',
                filter: 'blur(70px)',
                borderRadius: '50%',
                zIndex: -1
              }}
            />

            {/* Main Image Container with reference-style styling */}
            <div 
              style={{ 
                position: 'relative',
                width: '100%',
                maxWidth: '750px', /* Allow it to be slightly wider */
                animation: 'float 8s ease-in-out infinite',
                transformStyle: 'preserve-3d',
                transform: 'translateZ(-20px) rotateX(4deg) rotateY(-8deg) scale(1.05)', /* Increased tilt */
                transformOrigin: 'right center',
              }}
            >
              {/* The image itself, with a mask to fade the edges like the reference */}
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.6)', /* Darker background */
                border: '1px solid rgba(255, 255, 255, 0.04)', /* More subtle border */
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(99, 102, 241, 0.08)',
                /* VIGNETTE MASK: Fades the image out towards the bottom and edges to blend into black */
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%), radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                maskComposite: 'intersect',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%), radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
                WebkitMaskComposite: 'source-in',
                position: 'relative',
              }}>
                <img 
                  src="/result-of-interview.png" 
                  alt="Interview Result Dashboard" 
                  style={{ 
                    width: '100%', 
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: '0.85', /* Slightly more faded */
                    filter: 'contrast(1.1) brightness(0.9)', /* Darker but high contrast */
                  }} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div style="padding: 4rem; text-align: center; color: var(--text-secondary);">Image not found.<br/><br/><span style="font-size: 0.9rem">Please save your image as <b>result-of-interview.png</b> inside <b>frontend/public/</b> directory.</span></div>';
                  }}
                />
              </div>
              
              {/* Overlay gradient on top of the image to enhance the dark blend */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.85) 100%)',
                borderRadius: '24px',
                pointerEvents: 'none'
              }}/>
            </div>
          </div>
        </header>

      <section 
        className={featuresVisible ? 'animate-scroll-up' : 'opacity-0'}
        style={{ maxWidth: '1100px', margin: '4rem auto 0', transition: 'all 0.8s ease-out', padding: '0 1.5rem' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 800, fontSize: '2.5rem', color: 'var(--text-primary)' }}>Product Preview</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>Get a detailed breakdown of your performance after every session.</p>
        
        <div className="summary-section" style={{ margin: '0 1rem' }}>
          <div className="summary-grid" style={{ padding: '2rem' }}>
            <div className="summary-score">
              <div className="summary-score__header">
                <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Employability Score</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Top 15%</span>
              </div>
              <div className="summary-score__value" style={{ textShadow: '0 0 40px rgba(99, 102, 241, 0.6)', color: '#fff' }}>{animatedScore}</div>
              <div className="summary-score__breakdown">
                <div className="summary-score__row">
                  <span>Answer Correctness</span>
                  <span style={{ fontWeight: 600 }}>88</span>
                </div>
                <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '0.5rem' }}>
                  <div style={{ height: '100%', width: '88%', background: '#6366f1', borderRadius: '2px' }}></div>
                </div>
                <div className="summary-score__row">
                  <span>Communication</span>
                  <span style={{ fontWeight: 600 }}>82</span>
                </div>
                <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '0.5rem' }}>
                  <div style={{ height: '100%', width: '82%', background: '#10b981', borderRadius: '2px' }}></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="summary-feedback">
                <div className="summary-feedback__header">
                  <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={18} color="#6366f1" /> AI Coach Feedback
                  </span>
                </div>
                <p style={{ marginTop: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Your technical knowledge is highly employable. Focus on maintaining steady eye contact to convey more confidence during complex system design questions.
                </p>
              </div>

              <div className="summary-note" style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="#10b981" /> Key Strengths
                </h4>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>
                  <li>Excellent technical depth on React hooks.</li>
                  <li>Clear and concise verbal explanations.</li>
                  <li>Great speaking pace, avoiding fillers.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        ref={featuresRef} 
        className={`${featuresVisible ? 'animate-scroll-up' : 'opacity-0'} grid-background`}
        style={{ maxWidth: '1100px', margin: '4rem auto 0', transition: 'all 0.8s ease-out', position: 'relative' }}
      >
        <div style={{ position: 'relative', zIndex: 2, padding: '3rem 0' }}>
          <h2 style={{ marginBottom: '2.5rem', textAlign: 'center', fontWeight: 800, fontSize: '2.5rem', color: 'var(--text-primary)' }}>What you get</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass-panel feature-card ${featuresVisible ? `animate-scroll-up stagger-${(index % 6) + 1}` : 'opacity-0'}`}
              style={{
                borderColor: 'rgba(255, 255, 255, 0.18)',
                minHeight: '170px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className="feature-icon-wrapper">
                    {feature.icon}
                  </div>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{feature.title}</h3>
              </div>
              <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {feature.description}
              </p>
              <div className="feature-extra">
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {feature.details}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section 
        ref={stepsRef}
        className={stepsVisible ? 'animate-scroll-up' : 'opacity-0'} 
        style={{ maxWidth: '1040px', margin: '4.5rem auto 0', transition: 'all 0.8s ease-out', transitionDelay: '0.1s' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontWeight: 800, fontSize: '2.5rem', color: 'var(--text-primary)' }}>How it works</h2>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {[
            {
              title: 'Pick your focus',
              copy: 'Choose a role, difficulty level, and the skills you want to practice.',
              details:
                'Select from pre-built interview paths or customize your own set of topics (e.g., frontend algorithms, system design, or behavioral questions).',
            },
            {
              title: 'Practice with voice',
              copy: 'Answer guided questions out loud and get instant feedback on delivery and pacing.',
              details:
                'Record your response and receive a breakdown of speaking speed, filler words, and confidence level. Use the built-in timer to simulate real interview pressure.',
            },
            {
              title: 'Review your progress',
              copy: 'See analytics and recommendations to help you improve each session.',
              details:
                'Review detailed scoring metrics, view trends over time, and get next-step suggestions so every session is more effective than the last.',
            },
          ].map((step, index) => (
            <div key={step.title} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div className={`glass-panel step-card ${stepsVisible ? `animate-scroll-up stagger-${(index % 3) + 1}` : 'opacity-0'}`} style={{ padding: '2rem', flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {index + 1}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{step.title}</h3>
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.copy}</p>
                <div className="step-extra">
                  <p style={{ margin: '1rem 0 0', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>{step.details}</p>
                </div>
                
                {/* Visual Arrow for Desktop */}
                {index < 2 && (
                   <div style={{ position: 'absolute', top: '50%', right: '-1.5rem', transform: 'translateY(-50%)', zIndex: 10, display: 'none' }} className="step-arrow-icon">
                     <ArrowRight size={24} color="rgba(255,255,255,0.2)" />
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>


      <section 
        ref={testimonialsRef}
        className={testimonialsVisible ? 'animate-scroll-up' : 'opacity-0'} 
        style={{ maxWidth: '1040px', margin: '4.5rem auto 0', transition: 'all 0.8s ease-out', transitionDelay: '0.1s' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontWeight: 800, fontSize: '2.5rem', color: 'var(--text-primary)' }}>What people love</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" style={{ marginRight: '2px' }} />)}
          </div>
          <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>4.8</span>
          <span style={{ color: 'var(--text-secondary)' }}>from students and pros</span>
        </div>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {[
            {
              name: 'Sam K.',
              role: 'Software Engineer',
              quote: 'This tool made my interview prep feel structured and focused. The insights were spot on.',
              details:
                'The breakdown after each session made it easy to see exactly where I could improve. I started seeing results in real interviews.',
            },
            {
              name: 'Janelle R.',
              role: 'Product Manager',
              quote: 'I loved seeing the improvements session over session — the analytics are super helpful.',
              details:
                'Watching trends over time helped me focus on the right areas. The guidance feels like having a coach in your pocket.',
            },
            {
              name: 'Alex M.',
              role: 'Data Analyst',
              quote: 'It feels like practicing with a coach who never gets tired. Great for staying consistent.',
              details:
                'The voice feedback was so useful — I could immediately adjust my pace and reduce filler words. This is now part of my weekly routine.',
            },
          ].map((review, index) => (
            <div
              key={review.name}
              className={`glass-panel testimonial-card ${testimonialsVisible ? `animate-scroll-up stagger-${(index % 3) + 1}` : 'opacity-0'}`}
              style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: `linear-gradient(135deg, ${index === 0 ? '#6366f1, #a855f7' : index === 1 ? '#10b981, #3b82f6' : '#ec4899, #f43f5e'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontWeight: 600 }}>{review.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{review.role}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" style={{ marginRight: '2px' }} />)}
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  “{review.quote}”
                </p>
                <div className="testimonial-extra">
                  <p style={{ margin: '1rem 0 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {review.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '6rem', padding: '3rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1rem' }}>Prepx</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              AI-powered interview training with real-time feedback and guided questions to help you land your dream job.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Features</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Pricing</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Mock Interviews</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Blog</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Interview Guides</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Top 50 Questions</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: '1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Careers</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: '1100px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>© {new Date().getFullYear()} Prepx. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Twitter', 'LinkedIn', 'GitHub'].map(social => (
              <a key={social} href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
}
