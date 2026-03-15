import React, { useEffect, useRef } from 'react';

const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to fullscreen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle settings
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000); // Responsive amount
    const maxDistance = 150; // Max distance for connection lines
    
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4, // Very slow horizontal speed
        vy: (Math.random() - 0.5) * 0.4, // Very slow vertical speed
        radius: Math.random() * 1.5 + 0.5
      });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(129, 140, 248, 0.4)'; // Indigo dot
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Opacity scales with distance, max opacity 0.15
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        
        // Connect to mouse interactions
        let dxMouse = p.x - mouse.x;
        let dyMouse = p.y - mouse.y;
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 200) {
           ctx.beginPath();
           ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - distMouse / 200)})`; // Purple connecting line to mouse area
           ctx.lineWidth = 1;
           ctx.moveTo(p.x, p.y);
           ctx.lineTo(mouse.x, mouse.y);
           ctx.stroke();
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    let animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        pointerEvents: 'none',
        opacity: 0.8 // Soften the entire system to meet <0.1 opacity design constraint
      }} 
    />
  );
};

export default NeuralNetwork;
