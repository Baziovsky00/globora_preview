'use client'
import styles from './styles.module.css'
import { motion } from "motion/react"
import { useScroll } from "framer-motion"
import Image from 'next/image';

const Introduction2 = () => {
    return (
        <motion.div
            className={styles.page}
            style={{
                minHeight: "100vh"
            }}
            initial={{ backgroundColor: "#ffffff", color: "#000000" }}
            whileInView={{
                backgroundColor: "rgb(31, 33, 54)",
                color: "#ffffff",
                transition: {
                    duration: 0.5,
                    ease: "easeInOut"
                }
            }}
            viewport={{ once: false, amount: 0.2 }}>
            <div className={styles.content}>

                <div className={styles.headerCover}>
                    <motion.h2
                        initial={{ opacity: 1, y: 100, }}
                        whileInView={{ opacity: 1, y: 0, }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }} >Naszą misją jest budowanie mostów handlowych między Polską a światem.</motion.h2>
                </div>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}>Wierzymy, że polskie produkty mogą z powodzeniem konkurować na rynkach międzynarodowych – zarówno pod względem jakości, jak i ceny.
                </motion.h3>

                <div className={styles.bottomContent}>
                    <div className={styles.bottomLeft}>
                        <motion.p
                            className={styles.marketInfo}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}>Rynki na które eksportujemy nasze produkty:</motion.p>
                        <div className={styles.regions}>
                            {
                                regions.map((region, i) => (
                                    <motion.div
                                        className={styles.region}
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}>
                                        <p>{region}</p>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                    <motion.div
                        className={styles.imgContainer}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}>
                        <Image src={'/images/globe.jpg'} width={500} height={500} alt='Globora - export towarów na cały świat' />
                    </motion.div>
                </div>
            </div>
            {/* <div className={styles.page} style={{ backgroundColor: sectionBackgroundColor, transition: 'background-color 0.5s ease' }}> */}
        </motion.div>
    );
}

export default Introduction2;

const regions = [
    "Europa Zachodnia i Środkowo-wschodnia",
    "Bliski Wschód",
    "Azja Południowo-Wschodnia",
    "Afryka",
    "Ameryka Północna (USA, Kanada)"
]