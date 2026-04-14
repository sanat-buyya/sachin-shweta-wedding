import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function UpcomingPrograms() {
  const [programs, setPrograms] = useState([]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const videoRef = useRef(null);

  const allPrograms = [
    {
      id: 1,
      name: "Engagement",
      date: "2026-04-19",
      time: "14:00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2jwGhjKcjgkmSwecdSX_3Dy0CV2bcx19_DQ&s",
      map: "https://maps.app.goo.gl/iZs1PUHAsMCJWy7d8",
      datetime: "2026-04-19T14:00:00",
    },
    {
      id: 2,
      name: "Haladi (Bride Side)",
      date: "2026-05-07",
      time: "15:00",
      image: "https://i.pinimg.com/236x/9d/91/31/9d9131ba0f6fd345bba7853e47f34c89.jpg",
      map: "https://maps.app.goo.gl/5NRfBVKcp7fb2GbR6",
      datetime: "2026-05-07T15:00:00",
    },
    {
      id: 3,
      name: "Sangeet (Bride Side)",
      date: "2026-05-07",
      time: "19:00",
      image: "https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2018/01/Ruaw8558P2_PAR09019.jpg",
      map: "https://maps.app.goo.gl/5NRfBVKcp7fb2GbR6",
      datetime: "2026-05-07T19:00:00",
    },
    {
      id: 4,
      name: "Bhasunki",
      date: "2026-05-08",
      time: "19:00",
      image: "https://www.brides.com/thmb/nE41u3YYFhtvQipASLdnJkOFzDA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Baraat-Caroline-Lima-Main-6a87988e68b94df9a1d7f9efe4416fcd.jpg",
      map: "https://maps.app.goo.gl/5NRfBVKcp7fb2GbR6",
      datetime: "2026-05-08T19:00:00",
    },
    {
      id: 5,
      name: "Sangeet (Groom Side)",
      date: "2026-05-09",
      time: "16:00",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_DLCqSW6Zx8mxOgCQGyWvTsAdhKfFI6Exgg&s",
      map: "https://maps.app.goo.gl/LN29wcuEEmz7n6MJ6",
      datetime: "2026-05-09T16:00:00",
    },
    {
      id: 6,
      name: "Haladi (Groom Side)",
      date: "2026-05-10",
      time: "15:00",
      image: "https://i.pinimg.com/736x/13/01/de/1301dec08d4ce489022f001fde5fc1fd.jpg",
      map: "https://maps.app.goo.gl/LN29wcuEEmz7n6MJ6",
      datetime: "2026-05-10T15:00:00",
    },
    {
      id: 7,
      name: "Wedding Ceremony",
      date: "2026-05-11",
      time: "11:39",
      image: "https://assets.vogue.in/photos/69a41ddc3b691ac3ed5baaa7/master/w_1024%2Cc_limit/VKR60769.jpg",
      map: "https://maps.app.goo.gl/BekpSDJh3u8is2kp6",
      datetime: "2026-05-11T11:39:00",
    },
  ];

  const formatDateTime = (date, time) => {
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return new Date(year, month - 1, day, hour, minute);
  };

  const getProgramStatus = (programDateTime) => {
    const now = new Date();
    if (now > programDateTime) {
      return "completed";
    } else {
      return "upcoming";
    }
  };

  const joinprogram = (mapUrl) => {
    if (mapUrl) {
      window.open(mapUrl, "_blank");
    }
  };

  const formatDisplayDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDisplayTime = (time) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  // Preload images
  useEffect(() => {
    allPrograms.forEach((program) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [program.id]: true }));
      };
      img.src = program.image;
    });
  }, []);

  useEffect(() => {
    const updateProgramsStatus = () => {
      const updatedPrograms = allPrograms.map((program) => {
        const programDateTime = formatDateTime(program.date, program.time);
        const status = getProgramStatus(programDateTime);
        return { ...program, status, programDateTime };
      });
      setPrograms(updatedPrograms);
    };

    updateProgramsStatus();
    const interval = setInterval(updateProgramsStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentProgram = programs.find((p) => p.status === "upcoming");
  const completedCount = programs.filter((p) => p.status === "completed").length;

  // Retry video loading if it fails
  useEffect(() => {
    if (videoRef.current && !videoLoaded) {
      const video = videoRef.current;
      const handleError = () => {
        console.log("Video failed to load, retrying...");
        setTimeout(() => {
          if (video) {
            video.load();
          }
        }, 2000);
      };
      
      video.addEventListener('error', handleError);
      return () => video.removeEventListener('error', handleError);
    }
  }, [videoLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full"
    >
      {/* Video Background with Skeleton */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gray-800">
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-900/50 to-purple-900/50">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-white/70 text-sm">Loading video...</p>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-60' : 'opacity-0'
          }`}
          style={{ filter: "brightness(0.7) contrast(1.1) saturate(1.2)" }}
        >
          <source
            src="https://res.cloudinary.com/dgrxmavho/video/upload/v1776182937/vecteezy_3d-wedding-rings-animations_23745294_uc2lfe_2_nwjcyi.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="text-3xl font-bold text-white font-['Playfair_Display'] drop-shadow-lg"
          >
            Upcoming Programs
          </motion.h2>
        </div>

        {/* Programs List */}
        <div className="space-y-3">
          {programs.length === 0 ? (
            // Loading skeletons for programs
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl">
                  <SkeletonCircle className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            programs.map((program, index) => {
              const isCompleted = program.status === "completed";
              const isCurrent = program === currentProgram;
              const programDateTime = program.programDateTime;
              const isImageLoaded = imagesLoaded[program.id];

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 backdrop-blur-xl border border-white/20
                    ${
                      isCurrent
                        ? "bg-pink-500/20 shadow-lg"
                        : isCompleted
                          ? "bg-white/10"
                          : "bg-white/5 hover:bg-white/10"
                    }`}
                >
                  {/* Status Icon with Loading State */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative
                      ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                            ? "bg-pink-500 text-white animate-pulse ring-2 ring-pink-300"
                            : "bg-white/20 backdrop-blur-sm"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <>
                        {!isImageLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        <img
                          src={program.image}
                          alt={program.name}
                          className={`w-full h-full object-cover object-center rounded-full transition-opacity duration-300 ${
                            isImageLoaded ? 'opacity-100' : 'opacity-0'
                          }`}
                          onLoad={() => setImagesLoaded(prev => ({ ...prev, [program.id]: true }))}
                        />
                      </>
                    )}
                  </motion.div>

                  {/* Program Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`font-semibold flex items-start font-['Playfair_Display'] text-white
                            ${isCurrent ? "text-pink-300" : "text-white"}
                          `}
                        >
                          {program.name}
                        </h3>
                        <p className="text-xs text-white/70 mt-1">
                          {formatDisplayDate(program.date)} at {formatDisplayTime(program.time)}
                        </p>
                      </div>

                      {/* Status Badge */}
                      {!isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          className="text-right"
                        >
                          <div
                            className={`text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm
                              ${
                                isCurrent
                                  ? "bg-pink-500 text-white"
                                  : "bg-white/20 text-white/90"
                              }
                            `}
                          >
                            {isCurrent ? "Next" : "Upcoming"}
                          </div>
                        </motion.div>
                      )}
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          className="text-right"
                        >
                          <div className="text-xs font-semibold bg-green-500/80 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                            Completed
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Time remaining and Join button */}
                    <div className="flex justify-between items-center mt-2">
                      {isCurrent && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-pink-300 font-semibold"
                        >
                          <CountdownTimer targetDate={programDateTime} />
                        </motion.div>
                      )}
                      {!isCompleted && (
                        <button
                          onClick={() => joinprogram(program.map)}
                          className="bg-pink-500 hover:bg-pink-600 text-xs text-white font-semibold py-1.5 px-3 rounded-full transition duration-300 shadow-lg"
                        >
                           Join Program
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Completion Message */}
        {programs.length > 0 && completedCount === programs.length && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-6 text-center p-4 bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-md rounded-xl"
          >
            <svg className="w-12 h-12 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-white font-semibold">
              All programs completed! 🎉
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Countdown Timer Component
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft("Starting soon...");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (days > 0) {
        setTimeLeft(`⏰ ${days}d ${hours}h remaining`);
      } else if (hours > 0) {
        setTimeLeft(`⏰ ${hours}h ${minutes}m remaining`);
      } else {
        setTimeLeft(`⏰ ${minutes}m remaining`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <span>{timeLeft}</span>;
}

// Skeleton Components
function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-300/30 via-gray-400/20 to-gray-300/30 bg-[length:200%_100%] rounded ${className}`}
      style={{
        animation: 'shimmer 1.5s infinite'
      }}
    />
  );
}

function SkeletonCircle({ className }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-300/30 via-gray-400/20 to-gray-300/30 bg-[length:200%_100%] ${className}`}
      style={{
        animation: 'shimmer 1.5s infinite'
      }}
    />
  );
}

export default UpcomingPrograms;