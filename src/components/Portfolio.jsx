import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InternalProjectGrid from './InternalProjectGrid';
import { ExternalLink, Play } from 'lucide-react';

// ============================================================================
// 📁 PORTFOLIO CONFIGURATION - EDIT THIS SECTION
// ============================================================================
// PANDUAN:
// 1. "KEY" (Teks kiri sebelum titik dua) harus SAMA PERSIS dengan NAMA FOLDER di komputer.
// 2. "title": Text yang akan muncul di website (Boleh beda dengan nama folder).
// 3. "thumbnail": Jalur lengkap ke file gambar.
// ============================================================================

/* 
   === COPY PASTE TEMPLATE (UNTUK PROJECT BARU) ===
   
   "NAMA FOLDER ASLI": {
       title: "Judul Tampilan (Bebas)", 
       category: "Design / Operator / Esport / Photographer", 
       description: "Deskripsi Pekerjaan...",
       thumbnail: "/src/assets/thumbnails/NAMA_FILE_GAMBAR.png" 
   },

*/

const PROJECT_METADATA = {
    "Movora Play": {
        title: "Movora Play",
        category: "Design",
        description: "Social Media Design & Photo Editing",
        thumbnail: "/src/assets/thumbnails/Movora Play.webp"
    },
    "TSE X ROYAL HYPEFESTIVE": {
        title: "TSE X ROYAL HYPEFESTIVE",
        category: "Operator",
        description: "Event Broadcast Scene Setup & Live Event Operations",
        thumbnail: "/src/assets/thumbnails/TSE X ROYAL HYPEFESTIVE.webp"
    },
    "East Java Student Leader Summit": {
        title: "East Java Student Leader Summit",
        category: "Photographer",
        description: "Event Documentation & Moment Capturing",
        thumbnail: "/src/assets/thumbnails/East Java Student Leader Summit.webp"
    },
    "Royal Japan HYPE MLBB Tournament": {
        title: "Royal Japan HYPE MLBB Tournament",
        category: "Operator",
        description: "Broadcast Workflow Setup & Live Tournament Operations",
        thumbnail: "/src/assets/thumbnails/Royal Japan HYPE MLBB Tournament.webp"
    },
    "FotoRek!": {
        title: "FotoRek!",
        category: "Design",
        description: "Graphic Design for Feeds, Posters, Banners, and Photo Strips, with Responsibility for Camera and Lens Recommendations",
        thumbnail: "/src/assets/thumbnails/FotoRek!.webp"
    },
    "Marketing Crew Telkom University Surabaya": {
        title: "Marketing Crew Telkom University Surabaya",
        category: "Design",
        description: "Graphic design for Instagram feeds and stories, managing visual content and maintaining consistent branding across social media",
        thumbnail: "/src/assets/thumbnails/Marketing Crew Telkom University Surabaya.webp"
    },
    "Telkom University Surabaya Esport": {
        title: "Telkom University Surabaya Esport",
        category: "Design",
        description: "Led the media promotion team, overseeing visual design and broadcast operations, including scene setup, operator coordination, and end-to-end live event execution",
        thumbnail: "/src/assets/thumbnails/Telkom University Surabaya Esport.webp"
    },
};

const Portfolio = () => {
    const [filter, setFilter] = useState("All");
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredProject, setHoveredProject] = useState(null); // Optimize: Only render grid on hover
    const ITEMS_PER_PAGE = 6;
    const categories = ["All", "Design", "Photographer", "Operator"];

    useEffect(() => {
        // 1. Load Projects (Folder Content)
        const projectGlob = import.meta.glob('/src/assets/portfolio/**/*.{png,jpg,jpeg,webp,mp4}', { eager: true });

        // 2. Load Thumbnails (Cover Images)
        const thumbnailGlob = import.meta.glob('/src/assets/thumbnails/*.{png,jpg,jpeg,webp}', { eager: true });

        const projectMap = new Map();

        // Helper to find thumbnail
        const getThumbnail = (title, customSrc) => {
            // Priority 1: Direct Source Path (e.g. "/src/assets/thumbnails/img.png")
            if (customSrc) {
                // If it's a URL or Public path, return as is
                if (customSrc.startsWith('http') || customSrc.startsWith('/public')) return customSrc;

                // If it's a Glob key check
                if (thumbnailGlob[customSrc]) return thumbnailGlob[customSrc].default;

                // Try finding it by matching end of path (if user pasted partial path)
                for (const path in thumbnailGlob) {
                    // Standardize separators to forward slashes for comparison
                    const normalizedPath = path.replace(/\\/g, '/');
                    const normalizedCustom = customSrc.replace(/\\/g, '/');

                    if (normalizedPath.endsWith(normalizedCustom)) {
                        return thumbnailGlob[path].default;
                    }
                }
            }

            // Priority 2: Auto-find by Folder Name
            for (const path in thumbnailGlob) {
                if (path.includes(title)) {
                    return thumbnailGlob[path].default;
                }
            }
            return null;
        };

        Object.keys(projectGlob).forEach((path) => {
            const parts = path.split('/');
            if (parts.length >= 6) {
                const folderName = parts[4];
                const module = projectGlob[path];
                const src = module.default;
                const type = path.endsWith('.mp4') ? 'video' : 'image';

                // Get metadata based on FOLDER NAME
                const meta = PROJECT_METADATA[folderName] || {};

                // HIDE LOGIC: Skip if hidden is true
                if (meta.hidden) return;

                const displayName = meta.title || folderName; // Use custom title or folder name
                const category = meta.category || "Design";
                const desc = meta.description || "Creative & Technical Work";
                const customThumb = meta.thumbnail;

                if (!projectMap.has(folderName)) {
                    projectMap.set(folderName, {
                        id: folderName, // This is the Key used for sorting
                        title: displayName, // Show the custom title
                        category: category,
                        items: [],
                        thumbnail: getThumbnail(folderName, customThumb) || src,
                        desc: desc
                    });
                }

                projectMap.get(folderName).items.push({ src, type, path }); // Store path for sorting
            }
        });

        // SORT ITEMS inside each project (Fix for "scrambled" animation)
        projectMap.forEach((project) => {
            project.items.sort((a, b) => {
                // Natural sort (so 1.png, 2.png, 10.png orders correctly)
                return a.path.localeCompare(b.path, undefined, { numeric: true, sensitivity: 'base' });
            });
        });

        let projectsArray = Array.from(projectMap.values());

        // SORT LOGIC based on PROJECT_METADATA order
        const order = Object.keys(PROJECT_METADATA);
        projectsArray.sort((a, b) => {
            const indexA = order.indexOf(a.id);
            const indexB = order.indexOf(b.id);

            // If both present, sort by index
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            // If only A present, A comes first
            if (indexA !== -1) return -1;
            // If only B present, B comes first
            if (indexB !== -1) return 1;
            // If neither, keep original (or sort alphabetical?)
            return 0;
        });

        setProjects(projectsArray);
    }, []);

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    // DEBOUNCE HOVER LOGIC REMOVED due to user feedback ("delay/not responsive")
    // Reverted to instant hover for snappiness.
    // Optimization relies on InternalProjectGrid being lightweight (CSS animation).

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    // PAGINATION LOGIC
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
        // Removed scrollIntoView to keep user near pagination controls
    };

    return (
        <section id="portfolio" className="py-20 bg-background">
            <div className="w-full max-w-[1920px] mx-auto px-6 md:px-16 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                            Selected <span className="text-gradient">Works</span>
                        </h2>
                        <p className="text-gray-400">Highlights from my creative and technical journey.</p>
                    </div>

                    <div className="flex space-x-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all
                  ${filter === cat
                                        ? 'bg-primary text-black'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${filter}-${currentPage}`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.1
                                }
                            }
                        }}
                        className="columns-1 md:columns-2 lg:columns-3 gap-8 min-h-[50vh] space-y-8"
                    >
                        {/* Render Projects */}
                        {currentProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                variants={{
                                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 50,
                                            damping: 20
                                        }
                                    }
                                }}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                whileHover="hover"
                                className="group relative rounded-xl overflow-hidden aspect-video bg-surface border border-white/5 cursor-pointer shadow-lg break-inside-avoid"
                            >
                                {/* 1. Static Thumbnail (Dismisses on Hover) */}
                                <motion.div
                                    className="absolute inset-0 z-10 bg-gray-900"
                                    variants={{
                                        rest: { opacity: 1 },
                                        hover: { opacity: 0, transition: { duration: 0.3 } }
                                    }}
                                >
                                    <img loading="lazy"
                                        src={project.thumbnail}
                                        alt={`${project.title} Thumbnail`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>

                                {/* 2. Internal Tilted GRID Animation (Reveals on Hover) */}
                                {/* 2. Internal Tilted GRID Animation (Reveals on Hover) */}
                                {/* OPTIMIZATION: Always mount but only play when hovered */}
                                <InternalProjectGrid
                                    items={project.items}
                                    isActive={hoveredProject === project.id}
                                />


                                {/* 3. Text Overlay (PERMANENTLY VISIBLE) */}
                                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                                    <span className="text-primary text-xs uppercase tracking-wider font-bold mb-1">{project.category}</span>
                                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-300 text-sm font-medium border-l-2 border-primary pl-3">{project.desc}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Fillers to maintain grid height if items < 6 */}
                        {Array.from({ length: 6 - currentProjects.length }).map((_, i) => (
                            <div key={`filler-${i}`} className="aspect-video hidden md:block" aria-hidden="true" />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* PAGINATION CONTROLS */}
                {
                    totalPages > 1 && (
                        <div className="flex justify-center items-center mt-12 space-x-4">
                            {/* Previous Button used to be here, but simpler circles are cleaner. Or arrow? */}
                            {/* Let's do simple numbered circles */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border
                                    ${currentPage === page
                                            ? 'bg-primary border-primary text-black scale-110 shadow-glow'
                                            : 'bg-transparent border-white/20 text-white hover:bg-white/10'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )
                }
            </div >
        </section >
    );
};

export default Portfolio;
