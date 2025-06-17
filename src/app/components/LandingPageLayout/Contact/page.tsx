'use client'
import styles from './styles.module.css'
import { motion } from "motion/react"
import { useScroll } from "framer-motion"

const Contact = () => {
    return (
        <div className={styles.page}>

            <div className={styles.content}>

                <div className={styles.headerCover}>
                    <motion.h2
                        initial={{ opacity: 1, y: 100, }}
                        whileInView={{ opacity: 1, y: 0, }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }} >Chcesz rozwinąć swój eksport lub nawiązać współpracę z polskimi producentami?</motion.h2>
                </div>
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}>Zespół Globora jest do Twojej dyspozycji.
                </motion.h3>
                <div className={styles.contact}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}>
                        📧 globalfocusedspzoo@gmail.com
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 }}>
                        📞 +48 575 874 651
                    </motion.p>
                </div>

                <div className={styles.advanteges}>
                    {
                        advantages.map((advantage, i) => (
                            <motion.div
                                className={styles.advantage}
                                key={i}
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}>
                                    <span>✅</span>
                                <p><b>{advantage.header}</b> - {advantage.content}</p>
                            </motion.div>
                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default Contact;

const advantages = [
    {header: "Doświadczenie i wiedza rynkowa", content: "Zespół Globora to specjaliści z wieloletnim doświadczeniem w handlu międzynarodowym."},
    {header: "Indywidualne podejście", content: "Każdy klient jest dla nas partnerem – tworzymy relacje oparte na zaufaniu i skuteczności."},
    {header: "Szeroka sieć kontaktów", content: "Dzięki relacjom z producentami i dostawcami oferujemy konkurencyjne warunki handlowe."},
    {header: "Logistyka bez granic", content: "Organizujemy pełny łańcuch dostaw: transport, odprawy celne, magazynowanie."},
]