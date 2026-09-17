import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Structural Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Achievements from './pages/Achievements';
import Notes from './pages/Notes';
import Gallery from './pages/Gallery';
import SuggestEvent from './pages/SuggestEvent';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * Main Application Component with Centralized Routing
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="events" element={<Events />} />
          <Route path="projects" element={<Projects />} />
          <Route path="team" element={<Team />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="notes" element={<Notes />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="suggest-event" element={<SuggestEvent />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
