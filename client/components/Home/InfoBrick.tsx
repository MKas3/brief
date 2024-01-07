'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { HoverState } from '@/types/hover-state.types';
import { Variants, motion, Transition } from 'framer-motion';

type InfoBrickProps = {
  firstTitle?: React.ReactNode;
  secondTitle?: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
};

export default function InfoBrick({
  firstTitle,
  secondTitle,
  icon,
}: InfoBrickProps) {
  return (
    <div className='select-none text-center text-black'>
      <motion.div
        initial='initial'
        whileHover='hover'
        className='flex flex-col items-center overflow-hidden rounded-3xl bg-white px-8 h-full justify-center shadow-lg shadow-black/25'
      >
        <div className='flex'>{icon}</div>
        <div className='flex font-semibold whitespace-nowrap'>{firstTitle}</div>
        <div className='flex font-semibold whitespace-nowrap'>{secondTitle}</div>
      </motion.div>
    </div>
  );
}
