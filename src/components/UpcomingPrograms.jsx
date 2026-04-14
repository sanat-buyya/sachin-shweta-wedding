import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RingAnimation from "../../public/ringanimation.mov";

function UpcomingPrograms() {
  const [programs, setPrograms] = useState([]);

  // Define all programs with their dates and times
  const allPrograms = [
    {
      id: 1,
      name: "Engagement",
      date: "2026-04-19",
      time: "14:00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2jwGhjKcjgkmSwecdSX_3Dy0CV2bcx19_DQ&s",
      map: "https://maps.app.goo.gl/iZs1PUHAsMCJWy7d8",
      datetime: "2026-04-19T14:00:00",
    },
    {
      id: 2,
      name: "Haladi (Bride Side)",
      date: "2026-05-07",
      time: "15:00",
      image:
        "https://i.pinimg.com/236x/9d/91/31/9d9131ba0f6fd345bba7853e47f34c89.jpg",
      map: "https://maps.app.goo.gl/5NRfBVKcp7fb2GbR6",
      datetime: "2026-05-07T15:00:00",
    },
    {
      id: 3,
      name: "Sangeet (Bride Side)",
      date: "2026-05-07",
      time: "19:00",
      image:
        "https://image.wedmegood.com/resized-nw/700X/wp-content/uploads/2018/01/Ruaw8558P2_PAR09019.jpg",
      map: "https://maps.app.goo.gl/5NRfBVKcp7fb2GbR6",
      datetime: "2026-05-07T19:00:00",
    },
    {
      id: 4,
      name: "Bhasunki",
      date: "2026-05-08",
      time: "19:00",
      image:
        "https://www.brides.com/thmb/nE41u3YYFhtvQipASLdnJkOFzDA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Baraat-Caroline-Lima-Main-6a87988e68b94df9a1d7f9efe4416fcd.jpg",
      map: "https://maps.app.goo.gl/5NRfBVKcp7fb2GbR6",
      datetime: "2026-05-08T19:00:00",
    },
    {
      id: 5,
      name: "Sangeet (Groom Side)",
      date: "2026-05-09",
      time: "16:00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_DLCqSW6Zx8mxOgCQGyWvTsAdhKfFI6Exgg&s",
      map: "https://maps.app.goo.gl/5NRfBVKcp7fb2GbR6",
      datetime: "2026-05-09T16:00:00",
    },
    {
      id: 6,
      name: "Haladi (Groom Side)",
      date: "2026-05-10",
      time: "15:00",
      image:
        "https://i.pinimg.com/736x/13/01/de/1301dec08d4ce489022f001fde5fc1fd.jpg",
      map: "https://maps.app.goo.gl/5NRfBVKcp7fb2GbR6",
      datetime: "2026-05-10T15:00:00",
    },
    {
      id: 7,
      name: "Wedding Ceremony",
      date: "2026-05-11",
      time: "11:39",
      image:
        "https://assets.vogue.in/photos/69a41ddc3b691ac3ed5baaa7/master/w_1024%2Cc_limit/VKR60769.jpg",
      map: "https://maps.app.goo.gl/BekpSDJh3u8is2kp6",
      datetime: "2026-05-11T11:39:00",
    },
  ];

  // Function to format date and time
  const formatDateTime = (date, time) => {
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return new Date(year, month - 1, day, hour, minute);
  };

  // Function to get program status
  const getProgramStatus = (programDateTime) => {
    const now = new Date();
    if (now > programDateTime) {
      return "completed";
    } else {
      return "upcoming";
    }
  };

  const joinprogram = () => {
    if (currentProgram) {
      window.open(currentProgram.map, "_blank");
    }
  };

  // Function to format display date
  const formatDisplayDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  // Function to format display time
  const formatDisplayTime = (time) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  // Update programs status in real-time
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

  // Find current/upcoming program
  const currentProgram = programs.find((p) => p.status === "upcoming");
  const completedCount = programs.filter(
    (p) => p.status === "completed",
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 
            h-full  
           -translate-x-1/2 -translate-y-1/2 
           object-cover opacity-60"
          style={{ filter: "brightness(0.7) contrast(1.1) saturate(1.2)" }}
        >
          <source
            src={RingAnimation}

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
          {programs.map((program, index) => {
            const isCompleted = program.status === "completed";
            const isCurrent = program === currentProgram;
            const programDateTime = program.programDateTime;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-3 p-3 rounded-xl transition-all duration-300
  backdrop-blur-xl border border-white/20
  ${
    isCurrent
      ? "bg-pink-500/20 shadow-lg"
      : isCompleted
        ? "bg-white/10"
        : "bg-white/5 hover:bg-white/10"
  }
`}
              >
                {/* Status Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center overflow-hidden
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
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <img
                      src={program.image}
                      alt={program.name}
                      className="w-full h-full object-cover object-center rounded-full"
                    />
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
                        {formatDisplayDate(program.date)} at{" "}
                        {formatDisplayTime(program.time)}
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
                          ✓ Completed
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
                        onClick={joinprogram}
                        className="bg-pink-500 hover:bg-pink-600 text-xs text-white font-semibold py-1.5 px-3 rounded-full transition duration-300 shadow-lg"
                      >
                        📍 Join Program
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedCount === programs.length && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-6 text-center p-4 bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-md rounded-xl"
          >
            <svg
              className="w-12 h-12 text-white mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
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

export default UpcomingPrograms;
