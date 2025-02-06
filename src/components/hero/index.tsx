import React from "react";
import { motion } from "framer-motion";
import Logos from "./assets/logos";
import Wave from "./assets/wave";

interface PositionProps {
  left: string;
  top: string;
}

const variants = (delay: number, position: PositionProps) => ({
  hidden: {
    scale: 0,
    opacity: 0,
    top: '50%',
    left: '50%',
  },
  visible: {
    top: position.top,
    left: position.left,
    translateX: "-50%",
    translateY: "-50%",
    scale: 1,
    opacity: 1,
    rotate: [-3 - delay, 3 + delay + Math.random() * 10, -3 - delay],
    y: [0, -10 - delay + Math.random() * 10, 0], // Движение по оси Y

    transition: {
      top: { delay, duration: 0.75, ease: [0.19, 1, 0.22, 1] }, // Настройки для появления
      left: { delay, duration: 0.75, ease: [0.19, 1, 0.22, 1] }, // Настройки для появления
      opacity: { delay, duration: 0.75, ease: [0.19, 1, 0.22, 1] }, // Настройки для появления
      scale: { delay, duration: 0.75, ease: [0.19, 1, 0.22, 1] }, // Настройки для масштаба

      x: {
        delay,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      },
      y: {
        delay: delay + 0.1,
        repeat: Infinity,
        repeatType: "mirror",
        duration: 3.6,
        ease: "easeInOut",
      },
      rotate: {
        delay: delay + 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        duration: 3.6,
        ease: "easeInOut",
      },
    },
  },
});

const Hero = () => {
  const FloatingElement = ({
    style,
    delay = 0,
    position = { left: "50%", top: "50%" },
    children,
  }: {
    delay?: number;
    position?: PositionProps;
    style?: React.CSSProperties;
    children: React.ReactNode;
  }) => {
    return (
      <motion.div
        className="element"
        initial="hidden"
        whileInView="visible"
        variants={variants(delay, position)}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.3 },
        }}
        whileTap={{
          scale: 0.9,
          rotate: 0,
          transition: { duration: 0.3 },
          zIndex: 100,
        }}
        style={{
          ...style,
        }}
      >
        {children}
      </motion.div>
    );
  };

  const FloatingElements = () => {
    return (
      <>
        <FloatingElement
          delay={0.2}
          position={{ left: "50%", top: "40%" }}
          style={{ zIndex: 100, borderRadius: "50%", width: "240px", height: "240px" }}
        >
          <img src="/images/profile.jpeg" alt="Andrew Zhuk" style={{
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} />
        </FloatingElement>

        <FloatingElement
          delay={0.4}
          position={{ left: "15%", top: "20%" }}
        >
          <Logos.Kubernetes />
        </FloatingElement>

        <FloatingElement
          delay={0.7}
          position={{ left: "85%", top: "20%" }}
        >
          <Logos.Aws />
        </FloatingElement>

        <FloatingElement
          delay={0.85}
          position={{ left: "15%", top: "80%" }}
          style={{ width: "80px", height: "80px" }}
        >
          <Logos.Pg />
        </FloatingElement>

        <FloatingElement
          delay={0.9}
          position={{ left: "85%", top: "80%" }}
          style={{ width: "80px", height: "80px" }}
        >
          <Logos.Ts />
        </FloatingElement>

        <FloatingElement
          delay={1}
          position={{ left: "25%", top: "40%" }}
          style={{ width: "70px", height: "70px" }}
        >
          <Logos.Nest />
        </FloatingElement>

        <FloatingElement
          delay={0.8}
          position={{ left: "75%", top: "40%" }}
          style={{ width: "60px", height: "60px" }}
        >
          <Logos.Ruby />
        </FloatingElement>

        <FloatingElement
          delay={1.2}
          position={{ left: "65%", top: "90%" }}
          style={{ width: "60px", height: "60px" }}
        >
          <Logos.Docker />
        </FloatingElement>

        <FloatingElement
          delay={1.5}
          position={{ left: "25%", top: "90%" }}
          style={{ width: "80px", height: "80px" }}
        >
          <Logos.Terraform />
        </FloatingElement>

        <FloatingElement
          delay={1.7}
          position={{ left: "5%", top: "70%" }}
          style={{ width: "50px", height: "50px" }}
        >
          <Logos.Gha />
        </FloatingElement>
      </>
    );
  };

  return (
    <div className="hero">
      <div className="animation">
        <div className="wave">
          <Wave />
        </div>
        <div className="elements">
          <FloatingElements />
        </div>
      </div>
      <div className="content">
        <h1 className="title">👋 Hello, I'm Andrew Zhuk</h1>
        <div className="description">
          I'm a Software engineer, specializing in modern web technologies and
          blockchain development.
        </div>
      </div>
    </div>
  );
};

export default Hero;
