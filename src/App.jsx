import React, { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Welcome from './components/Welcome';

const Navbar = React.lazy(() => import('./components/Navbar'));
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const Experience = React.lazy(() => import('./components/Experience'));
const Contact = React.lazy(() => import('./components/Contact'));

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [isPreloading, setIsPreloading] = useState(false);

    const handleEnter = () => {
        setIsPreloading(true);
        // Delay to allow assets to buffer/mount while user sees "Loading..."
        setTimeout(() => {
            setShowWelcome(false);
            setIsPreloading(false);
        }, 1500);
    };

    return (
        <div className="bg-background min-h-screen text-white selection:bg-primary selection:text-black">
            <AnimatePresence mode='wait'>
                {showWelcome && (
                    <Welcome
                        key="welcome"
                        onEnter={handleEnter}
                        isPreloading={isPreloading}
                    />
                )}
            </AnimatePresence>

            {/* Content is rendered BEHIND Welcome screen to buffer assets */}
            <div className={`${showWelcome ? 'fixed inset-0 overflow-hidden pointer-events-none' : ''}`}>
                <Suspense fallback={
                    <div className="flex items-center justify-center h-screen bg-background text-primary">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                }>
                    <Navbar />
                    <Hero />
                    <About />
                    <Skills />
                    <Portfolio />
                    <Experience />
                    <Contact />
                </Suspense>
            </div>
        </div>
    );
}

export default App;
