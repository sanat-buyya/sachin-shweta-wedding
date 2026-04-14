import { motion } from "framer-motion";
import Flower from "../public/vibrant.webp";
import Designline from "../public/designline.webp";
import { useState, useEffect } from "react";
import UpcomingPrograms from "./components/UpcomingPrograms";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState({
    flowerTop: false,
    flowerBottom: false,
    designline: false,
    calendarBg: false
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navigateToMaps = () => {
    window.open(
      "https://maps.app.goo.gl/QLXQt3QUdPn16t216",
      "_blank"
    );
  };

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const startOffset = 5;
  const totalDays = 31;
  const dates = [
    ...Array(startOffset).fill(""),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.5, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 150,
        duration: 0.8,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date(2026, 4, 11, 11, 39, 0);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check if all images are loaded
  const allImagesLoaded = Object.values(imageLoaded).every(loaded => loaded === true);

  return (
    <section className="flex items-center justify-center p-3 relative bg-gradient-to-br from-pink-100 to-yellow-100">
      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 blur-xl"
        animate={floatingAnimation}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-xl"
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1.5 },
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", damping: 15 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-sm text-center relative z-10"
      >
        <div className="">
          {/* Top Flower with Skeleton */}
          <div className="relative w-full h-32 mb-4">
            {!imageLoaded.flowerTop && (
              <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <img
              src={Flower}
              alt="floral"
              onLoad={() => setImageLoaded(prev => ({ ...prev, flowerTop: true }))}
              className={`absolute top-0 right-0 w-full h-32 opacity-90 rotate-180 transition-opacity duration-500 ${
                imageLoaded.flowerTop ? 'opacity-90' : 'opacity-0'
              }`}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={allImagesLoaded ? "visible" : "hidden"}
          >
            <motion.h1
              variants={nameVariants}
              className="text-4xl font-['Great_Vibes'] bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
            >
              Sachin Kumar
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="text-xl font-['Dancing_Script'] text-gray-600 my-2 relative"
              whileHover={{ scale: 1.1 }}
            >
              <span className="relative">and</span>
            </motion.p>

            <motion.h1
              variants={nameVariants}
              className="text-4xl mt-3 font-['Great_Vibes'] bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent"
            >
              Shweta
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="mt-2 text-black text-md leading-relaxed font-['Cormorant_Garamond'] text-base"
              whileHover={{ scale: 1.02 }}
            >
              are invited to celebrate the joyful union
            </motion.p>
          </motion.div>

          {/* Decorative Line with Skeleton */}
          <div className="relative">
            {!imageLoaded.designline && (
              <Skeleton className="w-full h-8 mx-auto" />
            )}
            <motion.img
              src={Designline}
              alt="line"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: imageLoaded.designline ? "100%" : 0, opacity: imageLoaded.designline ? 1 : 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              onLoad={() => setImageLoaded(prev => ({ ...prev, designline: true }))}
              className={`mx-auto transition-opacity duration-500 ${
                imageLoaded.designline ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Calendar Section with Skeleton */}
          <div className="flex justify-center">
            <div className="relative rounded-2xl w-80 overflow-hidden">
              {!imageLoaded.calendarBg && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <div
                className={`relative transition-opacity duration-500 ${
                  imageLoaded.calendarBg ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  backgroundImage: "url('https://res.cloudinary.com/dgrxmavho/image/upload/v1776146836/Picsart_26-04-14_11-36-46-318_fqrkfh.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-white/70 backdrop-blur-1"></div>
                <div className="relative z-10 p-1">
                  <motion.h2
                    className="text-center text-lg font-semibold text-gray-900 mb-3 tracking-widest"
                    animate={pulseAnimation}
                  >
                    MAY 2026
                  </motion.h2>

                  <div className="grid grid-cols-7 text-center text-md text-gray-900 mb-2 border-b border-gray-500 pb-1 font-['Cormorant_Garamond']">
                    {days.map((day, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {day}
                      </motion.span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center">
                    {dates.map((date, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: i * 0.02,
                          type: "spring",
                          damping: 15,
                        }}
                        whileHover={{ scale: 1.1 }}
                        className={`h-8 w-8 flex items-center justify-center rounded-full text-sm transition-all duration-300
                          ${
                            date === 11
                              ? "border-2 border-rose-700 font-bold bg-white/80"
                              : "text-gray-900"
                          }`}
                      >
                        {date}
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    className="mt-4 text-gray-700 text-xl font-['Cormorant_Garamond'] text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    Time: 11:39 AM
                  </motion.p>
                </div>
              </div>
              <img
                src="https://res.cloudinary.com/dgrxmavho/image/upload/v1776146836/Picsart_26-04-14_11-36-46-318_fqrkfh.png"
                alt="calendar bg"
                className="hidden"
                onLoad={() => setImageLoaded(prev => ({ ...prev, calendarBg: true }))}
              />
            </div>
          </div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
            className="text-center p-4"
          >
            <motion.h3
              className="text-xl font-bold text-gray-700 mb-3 tracking-wide font-['Cormorant_Garamond']"
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              animate={{
                scale: [1, 1.05, 1],
                transition: { delay: 2, duration: 2, repeat: Infinity },
              }}
            >
              ⏰ TIME LEFT UNTIL THE WEDDING ⏰
            </motion.h3>

            <motion.div
              className="flex justify-center gap-3 mt-2 flex-wrap font-['dancing-script']"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-3 min-w-[70px] shadow-md border border-pink-100"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent font-['Times_New_Roman']"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.div>
                  <div className="text-xs text-gray-500 mt-1 font-['dancing-script']">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Location Map with Loading State */}
          <div className="relative">
            <div className="w-full h-48 rounded-2xl overflow-hidden px-2">
              {!isClient && <Skeleton className="w-full h-full" />}
              {isClient && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1776108722528!6m8!1m7!1si8xSmiEfSH9HNGNVG0CVGw!2m2!1d17.67983167951366!2d77.2026178137987!3f97.60326!4f0!5f0.7820865974627469"
                  className="w-full h-48 rounded-2xl border-0"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  title="Wedding Location Map"
                />
              )}
            </div>
          </div>

          <button
            onClick={navigateToMaps}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg hover:from-pink-600 hover:to-rose-600 transition-colors duration-300 font-['Cormorant_Garamond']"
          >
            View on Google Maps
          </button>

          {/* Bottom Flower with Skeleton */}
          <div className="relative w-full h-32">
            {!imageLoaded.flowerBottom && (
              <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <motion.img
              src={Flower}
              alt="floral"
              className={`absolute bottom-0 right-0 w-full h-32 transition-opacity duration-500 ${
                imageLoaded.flowerBottom ? 'opacity-90' : 'opacity-0'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: imageLoaded.flowerBottom ? 0.9 : 0, scale: imageLoaded.flowerBottom ? 1 : 0.8 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onLoad={() => setImageLoaded(prev => ({ ...prev, flowerBottom: true }))}
            />
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden">
          <UpcomingPrograms />
        </div>
        
        <div className="mt-4 mb-4 text-center text-gray-700 font-['Cormorant_Garamond'] font-bold text-sm px-4">
          THANK YOU FOR BEING A PART OF OUR JOURNEY! WE CAN'T WAIT TO CELEBRATE WITH YOU ON OUR SPECIAL DAY. SEE YOU ON MAY 11, 2026! 💖
        </div>
      </motion.div>
    </section>
  );
}

function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200/60 via-gray-300/40 to-gray-200/60 bg-[length:200%_100%] rounded-xl ${className}`}
      style={{
        animation: 'shimmer 1.5s infinite'
      }}
    />
  );
}
