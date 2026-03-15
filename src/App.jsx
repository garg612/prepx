import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { AuthProvider } from './AuthProvider';
import RequireAuth from './RequireAuth';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Setup from './pages/Setup';
import Interview from './pages/Interview';
import Processing from './pages/Processing';
import Report from './pages/Report';

// A simple Navbar to display globally (optional, but good for navigation)
import Navbar from './components/Navbar';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />

              <Route element={<RequireAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/interview" element={<Interview />} />
                <Route path="/processing" element={<Processing />} />
                <Route path="/report/:id" element={<Report />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Install the app with the following command:
// npm install --legacy-peer-deps
