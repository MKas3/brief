'use client';

import { Variants, motion } from 'framer-motion';

type MainRevealWrapperProps = {
  children: React.ReactNode;
};

const revealContainer: Variants = {
  initial: {
    y: '-15%',
    opacity: 0,
  },
  reveal: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 40
    },
  },
};

export default function MainRevealWrapper({
  children,
  ...otherProps
}: MainRevealWrapperProps) {
  return (
    <motion.div
      variants={revealContainer}
      initial='initial'
      whileInView='reveal'
      viewport={{ once: true, margin: '-40%' }}
    >
      {children}
    </motion.div>
  );
}
