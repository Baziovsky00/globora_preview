'use client'
import styles from './styles.module.css';
import { motion, useMotionValue, animate } from "framer-motion";
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

const Introduction = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragConstraints, setDragConstraints] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [showArrows, setShowArrows] = useState(false);
    const [isDragging, setIsDragging] = useState(false); // Track drag state
    const x = useMotionValue(0);
    
    // Calculate constraints and max scroll with debounce
    useEffect(() => {
        let resizeTimer: NodeJS.Timeout;
        
        const updateConstraints = () => {
            if (carouselRef.current && containerRef.current) {
                const carouselWidth = containerRef.current.scrollWidth;
                const containerWidth = carouselRef.current.offsetWidth;
                const newConstraints = Math.max(0, carouselWidth - containerWidth);
                
                setDragConstraints(newConstraints);
                setMaxScroll(newConstraints);
                setShowArrows(newConstraints > 0);
            }
        };

        const debouncedUpdate = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateConstraints, 100);
        };

        updateConstraints();
        window.addEventListener('resize', debouncedUpdate);
        return () => {
            window.removeEventListener('resize', debouncedUpdate);
            clearTimeout(resizeTimer);
        };
    }, []);

    // Handle arrow navigation with momentum
    const handleArrowClick = useCallback((direction: 'left' | 'right') => {
        if (isDragging) return; // Prevent interaction during drag
        
        if (!containerRef.current || !carouselRef.current) return;
        
        const step = carouselRef.current.offsetWidth * 0.7;
        const currentX = x.get();
        let newX = currentX;
        
        if (direction === 'left') {
            newX = Math.min(currentX + step, 0);
        } else {
            newX = Math.max(currentX - step, -maxScroll);
        }
        
        // Use spring physics for smoother animation
        animate(x, newX, { 
            type: "spring",
            stiffness: 300,
            damping: 30,
            restDelta: 0.001
        });
    }, [maxScroll, x, isDragging]);

    return (
        <div className={styles.page}>
            <div className={styles.blocks}>
                <div className={styles.block}>
                    <div className={styles.headerCover}>
                        <motion.h2
                            initial={{ opacity: 1, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }} 
                        >
                            Kim Jesteśmy
                        </motion.h2>
                    </div>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        Globora to dynamicznie rozwijająca się firma specjalizująca się w eksporcie polskich produktów na rynki międzynarodowe. Łączymy lokalne wartości z globalnym zasięgiem, oferując naszym partnerom najwyższej jakości towary oraz kompleksową obsługę logistyczno-handlową.
                    </motion.h3>
                </div>
                
                <div className={styles.block} style={{ marginLeft: 'auto' }}>
                    <div className={styles.headerCover}>
                        <motion.h2
                            initial={{ opacity: 1, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }} 
                        >
                            Eksportujemy
                        </motion.h2>
                    </div>
                    
                    {/* Carousel Wrapper */}
                    <div 
                        ref={carouselRef} 
                        className={styles.carouselWrapper}
                    >
                        <motion.div
                            ref={containerRef}
                            className={styles.container}
                            drag="x"
                            dragConstraints={{ right: 0, left: -dragConstraints }}
                            dragElastic={0.05} // Reduced elasticity for less bounce
                            dragMomentum={false} // Disable momentum to prevent overscroll issues
                            dragTransition={{ 
                                bounceStiffness: 150, 
                                bounceDamping: 30,
                                power: 0.1,
                                timeConstant: 200
                            }}
                            style={{ x }}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={() => setIsDragging(false)}
                        >
                            {whatWeExport.map((item, i) => (
                                <motion.div
                                    className={styles.exportBlock}
                                    key={i}
                                    whileHover={{ scale: 1.02 }} // Subtle hover effect
                                    transition={{ duration: 0.2 }}
                                >
                                    <Image
                                        src={'/images/' + item.img}
                                        width={550}
                                        height={550}
                                        alt={`Globora export towarów - ${item.title}`}
                                        draggable="false"
                                        priority={i < 2} // Prioritize first 2 images
                                    />
                                    <div className={styles.blockContent}>
                                        <h4>{item.title}</h4>
                                        <p>{item.subTitle}</p>
                                    </div>
                                    <div className={styles.bcgOverlay} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    
                    {/* Arrow navigation container */}
                    {showArrows && (
                        <div className={styles.arrowsContainer}>
                            <motion.button 
                                className={styles.arrowButton}
                                onClick={() => handleArrowClick('left')}
                                aria-label="Poprzedni element"
                                whileTap={{ scale: 0.95 }}
                                disabled={isDragging || x.get() === 0}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
                                </svg>
                            </motion.button>
                            <motion.button 
                                className={styles.arrowButton}
                                onClick={() => handleArrowClick('right')}
                                aria-label="Następny element"
                                whileTap={{ scale: 0.95 }}
                                disabled={isDragging || x.get() === -maxScroll}
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                                </svg>
                            </motion.button>
                        </div>
                    )}
                    
                    <p className={styles.info}>Dostosowujemy ofertę do potrzeb konkretnego rynku i odbiorcy.</p>
                </div>
            </div>
        </div>
    );
}

export default Introduction;

const whatWeExport = [
    {
        title: 'Artykuły spożywcze',
        subTitle: '(produkty naturalne, BIO, przetwory, słodycze)',
        img: 'artykuly-spo.jpg'
    },
    {
        title: 'Surowce i półprodukty',
        subTitle: '(chemia, tworzywa sztuczne, komponenty przemysłowe)',
        img: 'surowce.jpg'
    },
    {
        title: 'Artykuły gospodarstwa domowego',
        subTitle: '',
        img: 'artykuly-gosp.jpg'
    },
    {
        title: 'Produkty budowlane i wykończeniowe',
        subTitle: '',
        img: 'prod-budowlanych.jpg'
    },
    {
        title: 'Odzież i tekstylia',
        subTitle: '',
        img: 'tekstylia.jpg'
    }
];