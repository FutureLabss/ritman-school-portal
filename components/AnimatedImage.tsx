"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const AnimatedImage = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div
      className={`transition-transform duration-500 ${
        isAnimating ? "transform scale-110" : ""
      }`}
    >
      <Image src="/copy.png" alt="Success Icon" width={100} height={100} />
    </div>
  );
};

export default AnimatedImage;
