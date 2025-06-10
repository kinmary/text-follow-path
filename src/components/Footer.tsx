"use client";
import { MotionValue, useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import logo from "@/app/favicon.ico";
import Lenis from "lenis";

export const Footer = () => {
  const container = useRef<HTMLDivElement>(null);
  const paths = useRef<(SVGTextPathElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    scrollYProgress.on("change", (e) => {
      paths.current.forEach((path, i) => {
        path?.setAttribute("startOffset", -40 + i * 40 + e * 40 + "%");
      });
    });
  }, []);

  useEffect( () => {

    const lenis = new Lenis()
    function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)

    }
    requestAnimationFrame(raf)

}, [])

  return (
    <div ref={container}>
      <svg className="w-full mb-40" viewBox="0 0 250 90">
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
        <text
          className="text-[6px] uppercase font-bold"
          style={{ fill: "blue", fontFamily: "serif" }}
        >
          {[...Array(3)].map((_, i) => {
            return (
              <textPath
                key={`textPath_${i}`}
                ref={(ref) => {
                  paths.current[i] = ref;
                }}
                href="#curve"
                startOffset={`${i * 40}%`}
              >
                {`Lorem ipsum dolor sit amet ${i + 1}`}
              </textPath>
            );
          })}
        </text>
      </svg>
      <Logos scrollYProgress={scrollYProgress} />
    </div>
  );
};

interface LogosProps {
  scrollYProgress: MotionValue<number>;
}

const Logos = ({ scrollYProgress }: LogosProps) => {
  const y = useTransform(scrollYProgress, [0, 1], [-225, 0]);
  return (
    <div className="h-[250px] bg-black overflow-hidden">
      <motion.div
        style={{ y }}
        className="h-full bg-black flex items-center justify-center gap-10 p-10"
      >
        {[...Array(5)].map((_, index) => {
          return (
            <img
              key={`img_${index}`}
              src={logo.src}
              alt={`Logo ${index + 1}`}
              className="h-50 w-50"
            />
          );
        })}
      </motion.div>
    </div>
  );
};
