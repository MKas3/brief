'use client';

import { forwardRef, useContext, useEffect, useState } from 'react';
import { PaginateButton } from '@/components/BriefSteps/Paginate/PaginateButton';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import { clamp, motion, Variants } from 'framer-motion';

type PaginateProps = {
  pageCount?: number;
  maxLeft?: number;
  onPageChange?: (selected: number) => void;
  className?: string;
  pageClassName?: string;
  defaultValue?: number;
  canChange?: (page: number) => boolean;
};

const paginate: Variants = {
  animate: (page) => ({
    x: `${page * -2.75}rem`,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    },
  }),
};

const dots: Variants = {
  initial: {
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
  animate: {
    width: '0%',
    paddingInline: 0,
    marginRight: '0.5rem',
    scale: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export const Paginate = forwardRef(function Paginate(
  {
    pageCount = 0,
    maxLeft = 1,
    onPageChange,
    className,
    pageClassName,
    defaultValue,
    canChange,
  }: PaginateProps,
  ref,
) {
  const [page, setPage] = useContext(BriefStepContext);
  const [arr] = useState(Array.from<number>({ length: pageCount - 1 }));

  useEffect(() => {
    if (defaultValue) setPage(defaultValue);
  });

  useEffect(() => {
    if (onPageChange) onPageChange(page);
    setPage(page);
  }, [page, onPageChange, setPage]);

  const handlePaginateClick = (page: number) => {
    if (!canChange || canChange(page)) setPage(page);
  };

  return (
    <div className={(className ? `${className} ` : '') + 'flex'}>
      <div
        style={{ maxWidth: `${maxLeft * 2.75 - 0.25}rem` }}
        className='overflow-hidden'
      >
        <motion.div
          className='flex w-fit gap-x-2'
          variants={paginate}
          animate={'animate'}
          custom={clamp(0, pageCount - maxLeft - 1, page - 1)}
        >
          {arr.map((el, index) => (
            <PaginateButton
              key={index}
              isActive={page === index}
              className={pageClassName}
              activeClassName='bg-black text-white transition duration-500'
              inactiveClassName='hover:bg-black/20 transition duration-75'
              onClick={() => handlePaginateClick(index)}
            >
              {index + 1}
            </PaginateButton>
          ))}
        </motion.div>
      </div>
      <motion.p
        className='box-content select-none overflow-hidden whitespace-nowrap px-2 text-2xl font-bold transition-all duration-700'
        variants={dots}
        animate={page >= pageCount - maxLeft ? 'animate' : 'initial'}
        layout
      >
        · · ·
      </motion.p>

      <PaginateButton
        isActive={page === pageCount - 1}
        className={pageClassName}
        activeClassName='bg-black text-white transition duration-500'
        inactiveClassName='hover:bg-black/20 transition duration-75'
        onClick={() => handlePaginateClick(pageCount - 1)}
      >
        {pageCount}
      </PaginateButton>
    </div>
  );
});
