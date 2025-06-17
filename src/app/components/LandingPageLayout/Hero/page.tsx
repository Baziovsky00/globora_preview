'use client'
import styles from './styles.module.css'
import { Globe } from "@/components/magicui/globe";
import { motion } from "motion/react"

const Hero = () => {
    const countries = ["Europa Zachodnia", "Europa Środkowo wschodnia", "Bliski Wschód", "Azja Południowo-Wschodnia", "Afryka", "Ameryka Północna"]

    return (
        <div className={styles.page}>
            <motion.h1 initial={{ opacity: 0, y: 20}}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }} >Globalny handel. Lokalne wsparcie.</motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 20}}
                whileInView={{ opacity: 1, y: 0}}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.5 }} >Pomagamy polskim firmom w eksporcie towarów za granice, zapewniając pełną obsługę logistyczną, handlową, celną i dokumentacyjną w transporcie drogowym, morskim oraz lotniczy</motion.h2>
            <div className={styles.globe}>
                <Globe />
            </div>
            <div className={styles.countries}>
                {
                    countries.map((country, i) => (
                        <motion.div
                            key={i}
                            className={`${i % 2 === 0 ? styles.countryEven : styles.countryOdd} ${styles[`block${i}`]}`}
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }} >
                            <p>{country}</p>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
}

export default Hero;