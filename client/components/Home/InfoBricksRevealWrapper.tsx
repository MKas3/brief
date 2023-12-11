'use client';

import { motion, useInView, Variants } from "framer-motion";

type InfoBricksRevealWrapper = {
  children: React.ReactNode;
};

const revealContainer: Variants = {
  initial: {
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 40
    },
  },
  reveal: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 40
    },
  },
};

export default function InfoBricksRevealWrapper({
  children,
}: InfoBricksRevealWrapper) {
  return (
    <motion.div
      variants={revealContainer}
      initial='initial'
      whileInView='reveal'
      className='absolute inset-0'
      viewport={{ once: false, margin: '-200px 0px -200px 0px' }}
    >
      {children}
    </motion.div>
  );
}
