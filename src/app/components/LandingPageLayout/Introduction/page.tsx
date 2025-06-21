'use client'
import styles from './styles.module.css';
import { motion, useMotionValue, animate } from "framer-motion";
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from "framer-motion";

const Introduction = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragConstraints, setDragConstraints] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [showArrows, setShowArrows] = useState(false);
    const x = useMotionValue(0);

    const h2Ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(h2Ref, { once: true, margin: "-100px" });


    useEffect(() => {
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

        updateConstraints();
        window.addEventListener('resize', updateConstraints);
        return () => window.removeEventListener('resize', updateConstraints);
    }, []);

    const handleArrowClick = useCallback((direction: any) => {
        if (!containerRef.current || !carouselRef.current) return;

        const step = carouselRef.current.offsetWidth * 0.7;
        const currentX = x.get();
        let newX = currentX;

        if (direction === 'left') {
            newX = Math.min(currentX + step, 0);
        } else {
            newX = Math.max(currentX - step, -maxScroll);
        }

        animate(x, newX, { duration: 0.5, ease: "easeOut" });
    }, [maxScroll, x]);

    return (
        <div className={styles.page}>
            <div className={styles.blocks}>
                <div className={styles.topAnimation}>
                    <div className={styles.block}>
                        <div className={styles.headerCover}>
                            <motion.h2
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                ref={h2Ref}
                            >
                                KIM JESTEŚMY
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
                    <div className={isInView ? styles.animBlockTrue : styles.animBlockOff}>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            style={{ marginTop: 32, marginBottom: 0 }}
                        >
                            Eksportujemy na:
                        </motion.h3>
                        <div className={`${styles.countries} ${isInView ? styles.countriesInView : ''}`}>
                            {
                                countries.map((country, i) => (
                                    <motion.div
                                        key={i}
                                        className={`${i % 2 === 0 ? styles.countryEven : styles.countryOdd} ${styles[`block${i}`]}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.2 }} >
                                        <p>{country}</p>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.block} style={{ marginLeft: 'auto' }}>
                    <div className={styles.headerCover}>
                        <motion.h2
                            initial={{ opacity: 1, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            EKSPORTUJEMY
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
                            dragElastic={0.1}
                            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                            style={{ x }}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {whatWeExport.map((item, i) => (
                                <div
                                    className={styles.exportBlock}
                                    key={i}
                                >
                                    <Image
                                        src={'/images/' + item.img}
                                        width={550}
                                        height={550}
                                        alt={`Globora export towarów - ${item.title}`}
                                        draggable="false"
                                    />
                                    <div className={styles.blockContent}>
                                        <h4>{item.title}</h4>
                                        <p>{item.subTitle}</p>
                                    </div>
                                    <div className={styles.bcgOverlay} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Arrow navigation container */}
                    {showArrows && (
                        <div className={styles.arrowsContainer}>
                            <button
                                className={styles.arrowButton}
                                onClick={() => handleArrowClick('left')}
                                aria-label="Poprzedni element"
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
                                </svg>
                            </button>
                            <button
                                className={styles.arrowButton}
                                onClick={() => handleArrowClick('right')}
                                aria-label="Następny element"
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
                                </svg>
                            </button>
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

const countries = ["Europa Zachodnia", "Europa Środkowo wschodnia", "Bliski Wschód", "Azja Południowo-Wschodnia", "Afryka", "Ameryka Północna"]
