"use client";

import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "Welcome to My Blog",
      "I write about Programming",
      "And Mental Health",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  return (
    <div
      className="w-full bg-cover bg-center mb-30 -mt-15 h-[650px] sm:h-[500px] md:h-[600px] lg:h-[650px]"
      style={{ backgroundImage: "url('/rome.jpg')" }}
    >
      <div className="w-full font-bold text-5xl text-center mr-80 pt-40">
        <div className="w-full h-60 bg-black opacity-70 text-white z-[-1]">
          <div
            className="h-80 pb-24 max-w-screen-2xl mx-auto flex flex-col justify-center
              items-center text-4xl md:text-5xl font-extrabold text-center"
          >
            <motion.div
              className="h-80 max-w-screen-2xl max-auto flex flex-col justify-center items-center"
              initial={{ x: -1000, opacity: 0, scale: 0.5 }}
              animate={{ x: [0, 900, 0] }}
              transition={{
                duration: 2,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h1 className="text-3xl md:text-5xl text-[#fff] font-semibold ml-4 mt-10">
                {" "}
                My Blog{" "}
              </h1>
              <p className="text-xl md:text-3xl font-semibold mt-2 text-[#fff]">
                {text}
                <Cursor cursorBlinking cursorStyle="|" cursorColor="#4285f4" />
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
