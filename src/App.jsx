import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Welcome from './components/Welcome';

function App() {
    const [showWelcome, setShowWelcome] = useState(true);

    return (
        <div className="bg-background min-h-screen text-white selection:bg-primary selection:text-black">
            <AnimatePresence mode='wait'>
                {showWelcome ? (
                    <Welcome key="welcome" onEnter={() => setShowWelcome(false)} />
                ) : (
                    <>
                        <Navbar />
                        <Hero />
                        <About />
                        <Skills />
                        <Portfolio />
                        <Experience />
                        <Contact />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
