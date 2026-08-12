import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Skills } from './components/Skills';
import { WorkExperience } from './components/WorkExperience';
import { About } from './components/About';
import { OpenSource } from './components/OpenSource';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CoffeePreloader } from './components/CoffeePreloader';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return (savedTheme as 'dark' | 'light') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Animated Coffee Brewing & Preloader */}
      {isLoading && <CoffeePreloader onComplete={() => setIsLoading(false)} />}

      {/* Sticky Top Navigation with Theme Toggle */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        <Hero />
        <FeaturedProjects />
        <Skills />
        <WorkExperience />
        <About />
        <OpenSource />
        <Contact />
      </main>

      {/* Engineering Footer */}
      <Footer />
    </div>
  );
}

export default App;


