'use client'
import styles from './styles.module.css'
import { Globe } from "@/components/magicui/globe";
import { motion } from "motion/react"
import Link from 'next/link';

const Hero = () => {

    return (
        <div className={styles.page}>
            <motion.h1 initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }} ><span className={styles.h1Span}>Globalny handel.</span> <br />Lokalne wsparcie.</motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }} >Pomagamy polskim firmom w eksporcie towarów za granice, zapewniając pełną obsługę logistyczną, handlową, celną i dokumentacyjną w transporcie drogowym, morskim oraz lotniczy</motion.h2>
            <motion.div
                className={styles.heroButtons}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link href={'/o-nas'}>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.7}}
                        animate={{ opacity: 1, scale: 1}}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        whileHover={{ scale: 1.02, boxShadow: "0px 4px 24px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 1.01 }}
                    >
                        Dowiedz się więcej
                    </motion.button>
                </Link>
                <Link href={'/kontakt'}>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.7}}
                        animate={{ opacity: 1, scale: 1}}
                        transition={{ type: "spring", stiffness: 400, damping: 10}}
                        whileHover={{ scale: 1.02, boxShadow: "0px 4px 24px rgba(0,0,0,0.15)" }}
                        whileTap={{ scale: 1.01 }}
                    >
                        Pracuj z nami
                    </motion.button>
                </Link>
            </motion.div>
            <div className={styles.globe}>
                <Globe />
            </div>
           
        </div>
    );
}

export default Hero;