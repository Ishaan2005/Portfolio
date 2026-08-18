import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { WorkExperience } from './components/WorkExperience';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  useEffect(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('portfolio-theme');
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        <Hero />
        <FeaturedProjects />
        <WorkExperience />
        <About />
        <Contact />
      </main>

      {/* Engineering Footer */}
      <Footer />
    </div>
  );
}

export default App;


