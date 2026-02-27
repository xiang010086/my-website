import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
      </main>
      <Contact />
    </div>
  );
}

export default App;
