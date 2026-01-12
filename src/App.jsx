import React, { useState, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Welcome from './components/Welcome';
import Loading from './components/Loading';

const Navbar = React.lazy(() => import('./components/Navbar'));
const Hero = React.lazy(() => import('./components/Hero'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const Experience = React.lazy(() => import('./components/Experience'));
const Contact = React.lazy(() => import('./components/Contact'));

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const handleEnter = () => {
        setShowWelcome(false);
        setShowLoading(true);
    };

    const handleLoadingComplete = () => {
        // 1. Loading finishes -> Fade out Loading Screen
        setShowLoading(false);

        // 2. Wait for Loading exit animation (0.8s) to finish -> Screen is Black
        // 3. Then fade in Content
        setTimeout(() => {
            setShowContent(true);
        }, 1000);
    };

    return (
        <div className="bg-background min-h-screen text-white selection:bg-primary selection:text-black">
            <AnimatePresence mode='wait'>
                {showWelcome && (
                    <Welcome
                        key="welcome"
                        onEnter={handleEnter}
                    />
                )}
                {showLoading && (
                    <Loading
                        key="loading"
                        onComplete={handleLoadingComplete}
                    />
                )}
            </AnimatePresence>

            {/* Content is rendered BEHIND but invisible until transition completes */}
            <div className={`transition-opacity duration-1000 ease-out ${showContent ? 'opacity-100' : 'fixed inset-0 overflow-hidden pointer-events-none opacity-0'}`}>
                <Suspense fallback={null}>
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
