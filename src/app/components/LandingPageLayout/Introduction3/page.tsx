'use client'
import styles from './styles.module.css'
import { motion } from "motion/react"
import Image from 'next/image';
import { FaGlobeAmericas } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { FiFileText } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";

const Introduction3 = () => {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.headerCover}>
                    <motion.h2
                        initial={{ opacity: 1, y: 50, }}
                        whileInView={{ opacity: 1, y: 0, }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }} >Z nami międzynarodowy handel staje się prosty</motion.h2>
                </div>
                <div className={styles.contentBottom}>
                    <motion.div
                        className={styles.imgContainer}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}>
                        <Image
                            src={'/images/partnership.jpg'}
                            width={600}
                            height={400}
                            alt='Co zyskujesz współpracą z globora' />
                    </motion.div>
                    <div className={styles.offer}>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}>Specjalizujemy się w:</motion.h3>
                        <div className={styles.offerList}>
                            {
                                offer.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}>
                                        <p className={styles.icon}>{item.icon}</p>
                                        <p className={styles.title}>{item.title}</p>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Introduction3;

const offer = [
    { title: "Wsparciu w wejściu na nowe rynki eksportowe", icon: <FaGlobeAmericas /> },
    { title: "Kompletowaniu zamówień mieszanych", icon: <GoPackage /> },
    { title: "Obsłudze dokumentacyjnej i certyfikacyjnej", icon: <FiFileText /> },
    { title: "Doradztwie handlowym i kulturowym", icon: <FaHandshake /> },
]