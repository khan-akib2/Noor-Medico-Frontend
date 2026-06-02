"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Inner component to synchronize Lenis events with GSAP ScrollTrigger and Ticker.
 */
function LenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Connect Lenis scroll to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Sync Lenis RAF with GSAP Ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Clean up lag smoothing to prevent desync
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(updateTicker);
    };
  }, [lenis]);

  return null;
}

/**
 * SmoothScroll wrapper component using Lenis.
 * Enables high-performance, smooth inertial scrolling across the website.
 */
export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easeOutExpo
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <LenisSync />
      {children}
    </ReactLenis>
  );
}
