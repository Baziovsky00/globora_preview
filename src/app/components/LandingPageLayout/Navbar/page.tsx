"use client";
import Link from 'next/link';
import styles from './styles.module.css'
import Image from 'next/image';
import { useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Easing } from "framer-motion"

const Navbar = () => {
    const { scrollY } = useScroll();
    const [scroll, setScroll] = useState(typeof window !== 'undefined' ? window.scrollY : 0);
    const [animationActive, setAnimationActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when window resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1000) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setScroll(window.scrollY);
        return scrollY.on("change", (latest) => setScroll(latest));
    }, [scrollY]);

    useEffect(() => setAnimationActive(scroll > 20), [scroll]);

    const links = [
        {
            name: "Nasza misja",
            link: 'nasza-misja',
            type: 'link'
        },
        {
            name: 'Usługi',
            link: 'uslugi',
            type: 'link'
        },
        {
            name: 'Kontakt',
            link: 'kontakt',
            type: 'link'
        },
        {
            name: 'Pracuj z nami',
            link: 'pracuj-z-nami',
            type: 'button'
        },
    ];

    // Animation variants for mobile menu
    const menuVariants = {
        hidden: {
            x: "100%",
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" as Easing },
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" as Easing },
        },
    };

    return (
        <div className={`${styles.page} ${animationActive && styles.pageActive}`}>
            <div className={`${styles.content} ${animationActive && styles.contentActive}`}>
                <Link href={'/'}>
                    <div className={styles.logo}>
                        <Image
                            src={'/images/logo.png'}
                            width={70}
                            height={70}
                            alt='Globora - handel międzynarodowy'
                        />
                        <p>Globora</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopLinks}>
                    {links.map((link, i) => (
                        <Link
                            key={i}
                            href={`/${link.link}`}
                            className={link.type !== 'link' ? styles.button : styles.link}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Hamburger Icon */}
                {
                    !isMenuOpen && <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.1, delay: 0.2 }}
                        className={styles.hamburger}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className={`${styles.hamburgerLine} ${isMenuOpen && styles.line1}`}></div>
                        <div className={`${styles.hamburgerLine} ${isMenuOpen && styles.line2}`}></div>
                        <div className={`${styles.hamburgerLine} ${isMenuOpen && styles.line3}`}></div>
                    </motion.div>
                }

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <div className={styles.mobileOverlay} onClick={() => setIsMenuOpen(false)}>
                            <motion.div
                                className={styles.mobileMenu}
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className={styles.mobileHeader}>
                                    <div className={styles.logo}>
                                        <Image
                                            src={'/images/logo.png'}
                                            width={60}
                                            height={60}
                                            alt='Globora - handel międzynarodowy'
                                        />
                                        <p>Globora</p>
                                    </div>
                                    <button
                                        className={styles.closeButton}
                                        onClick={() => setIsMenuOpen(false)}
                                        aria-label="Zamknij menu"
                                    >
                                        &times;
                                    </button>
                                </div>

                                <div className={styles.mobileLinks}>
                                    {links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={`/${link.link}`}
                                            className={link.type !== 'link' ? styles.mobileButton : styles.mobileLink}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className={styles.mobileFooter}>
                                    <p>© 2025 Globora</p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Navbar;