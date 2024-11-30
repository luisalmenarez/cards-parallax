'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url?: string;
  color: string;
  progress: MotionValue<number>;
  range: number[];
  targetScale: number;
}

export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null); // Ref

  // Controla el progreso del scroll en Y (Framer Motion)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  // Controla el tamaño del elemento segun el scroll realizado
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <section
      ref={container}
      className="flex items-center justify-center h-screen sticky top-0">
      <motion.article
        style={{
          scale,
          backgroundColor: color,
          top: `calc(-10% + ${i * 50}px)`,
        }}
        className="flex flex-col -top-[25%] w-[1000px] h-[500px] p-12 origin-top  relative rounded-3xl">
        <h2 className="text-center text-black m-0 text-2xl">{title}</h2>
        <div className="flex h-full mt-12 gap-12">
          <div className="w-1/2 relative top-[10%]">
            <p className="text-base first-letter:text-3xl">{description}</p>
            <span className="flex items-center gap-1">
              <a
                href={url}
                target="_blank"
                className="text-lg underline cursor-pointer">
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
          <div className="relative w-2/3 h-full rounded-2xl overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="size-full">
              <Image
                fill
                src={`/images/${src}`}
                alt="image"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.article>
    </section>
  );
};
