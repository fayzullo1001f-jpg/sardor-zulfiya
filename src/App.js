import React, {useEffect, useState, useRef, useMemo} from "react";
import {motion} from "framer-motion";
import "./App.css";

import musicFile from "./music/МОТ_Когда_мужчина_влюблён_Премьера_клипа,_2024.mp3";

import play from "./img/circle-play-regular-full.svg";
import pause from "./img/circle-pause-regular-full.svg";

import wed_lw from "./img/fairytale-shoot-in-a-meadow-couple-embracing.jpg";
import restaurant from "./img/L_height.webp";
import ring from "./img/newlyleds-exchanging-ring.jpg";

import bride
    from "./img/bride-and-groom-on-the-background-of-a-fairy-tale-forest-royal-wedding-concept-the-groom-embraces-the-bride-tenderness-and-calmness-photo.jpg";

import brides
    from "./img/bride-and-groom-on-the-background-of-a-fairy-tale-forest-royal-wedding-concept-the-groom-embraces-the-bride-tenderness-and-calmness-portrait-photo.jpg";

import cake from "./img/fbae6c59ca025e648f431cb1442ceb7c7ef52519.webp";

function App() {
    const [timeLeft, setTimeLeft] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);

    const weddingDate = useMemo(
        () => new Date(2026, 7, 1, 18, 0, 0).getTime(),
        []
    );

    // TIMER
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                setTimeLeft("Boshlanmoqda 🎉");
                clearInterval(interval);
            } else {
                const d = Math.floor(distance / (1000 * 60 * 60 * 24));
                const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
                const m = Math.floor((distance / (1000 * 60)) % 60);
                const s = Math.floor((distance / 1000) % 60);

                setTimeLeft(`${d} kun • ${h} soat • ${m} min • ${s} sek`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [weddingDate]);

    // MUSIC
    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch(() => {
            });
            setIsPlaying(true);
        }
    };

    // ANIMATION VARIANTS
    const textVariant = {
        hidden: {opacity: 0, y: 30},
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {delay: i * 0.2, duration: 0.6}
        })
    };

    const imgVariant = {
        hidden: {opacity: 0, scale: 0.85},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {duration: 0.8}
        }
    };

    return (
        <div className="app">
            <audio ref={audioRef} loop>
                <source src={musicFile} type="audio/mp3"/>
            </audio>

            {/* HERO */}
            <section className="hero">
                <motion.img
                    src={bride}
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 1}}
                    className="hero_img"
                />

                <motion.h1
                    initial={{opacity: 0, letterSpacing: "20px"}}
                    animate={{opacity: 1, letterSpacing: "3px"}}
                    transition={{duration: 1}}
                >
                    Sardor
                </motion.h1>

                <span>&</span>

                <motion.h1
                    initial={{opacity: 0, letterSpacing: "20px"}}
                    animate={{opacity: 1, letterSpacing: "3px"}}
                    transition={{duration: 1}}
                >
                    Zulfiya
                </motion.h1>

                <p className="date">01 August 2026</p>

                <div className="music_btn" onClick={toggleMusic}>
                    <img src={isPlaying ? pause : play} alt=""/>
                </div>
            </section>

            {/* INFO */}
            <motion.section
                className="section sed"
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
            >
                <motion.h2 custom={0} variants={textVariant} initial="hidden" whileInView="visible">
                    TO‘Y TAKLIFNOMASI
                </motion.h2>

                <motion.p custom={1} variants={textVariant} initial="hidden" whileInView="visible">
                    Assalomu alaykum!
                    Hurmatli mehmonimiz!
                    Sizni nikoh to'yimiz munosabati bilan
                    bo'lib o'tadigan <br/> "Visol oqshomi"ga
                    taklif etamiz.💍
                </motion.p>

                <motion.div className="border" variants={imgVariant} initial="hidden" whileInView="visible">
                    <img className="img_bor" src={wed_lw} alt=""/>
                </motion.div>

                <div className="timer">{timeLeft}</div>
            </motion.section>

            {/* CALENDAR */}
            <motion.section className="section "  initial={{opacity: 0}} whileInView={{opacity: 1}}>
                <h2>TO'Y KUNI</h2>

                <motion.img src={cake} className="cade" variants={imgVariant} initial="hidden" whileInView="visible"/>

                <div className="calendar">
                    {Array.from({length: 31}, (_, i) => {
                        const day = i + 1;
                        return (
                            <div key={i} className={`day ${day === 1 ? "active_day" : ""}`}>
                                {day}
                            </div>
                        );
                    })}
                </div>
                <h2>1 August</h2>
            </motion.section>

            {/* LOCATION */}
            <motion.section className="section" initial={{opacity: 0}} whileInView={{opacity: 1}}>
                <h2>LOKATSIYA</h2>

                <motion.img src={restaurant} className="restaurant" variants={imgVariant} initial="hidden"
                            whileInView="visible"/>

                <iframe
                    title="map"
                    src="https://www.google.com/maps?q=Versal%20to'yxonasi%20Toshkent&output=embed"
                    className="map"
                />
            </motion.section>

            {/* TIMELINE */}
            <motion.section className="section" initial={{opacity: 0}} whileInView={{opacity: 1}}>
                <h2>TO‘Y DASTURI</h2>

                <div className="timeline">
                    {[
                        ["17:00", "Mehmonlar kelishi"],
                        ["18:00", "Boshlanish"],
                        ["19:00", "Nikoh marosimi"],
                        ["22:00", "Tort 🎂"],
                    ].map(([time, text], i) => (
                        <div key={i} className="timeline_item">
                            <b>{time}</b>
                            <span>{text}</span>
                        </div>
                    ))}
                </div>

                <motion.img src={ring} className="ring" variants={imgVariant} initial="hidden" whileInView="visible"/>
            </motion.section>

            {/* FOOTER */}
            <section className="footer">
                <h1>Sardor & Zulfiya</h1>

                <img src={brides} className="footer_img" alt=""/>

                <p>Sizni kutamiz ❤️</p>
            </section>
        </div>
    );
}

export default App;