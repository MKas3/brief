import { Button } from '@/components/Button';
import { BiArrowBack } from 'react-icons/bi';
import React from 'react';
import BriefService from '@/services/brief.service';
import { motion } from 'framer-motion';

type NextPrevButtonsProps = {
  className?: string;
  isPrevActive?: boolean;
  isNextActive?: boolean;
  isNextHidden?: boolean;
  isPrevHidden?: boolean;
  isHasFinish?: boolean;
  next?: React.ReactNode;
  prev?: React.ReactNode;
  onPrevClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
  nextForm?: string;
};

export default function NextPrevButtons({
  className,
  isPrevActive,
  isNextActive,
  isPrevHidden,
  isNextHidden,
  isHasFinish,
  next,
  prev,
  onPrevClick,
  onNextClick,
  nextForm,
}: NextPrevButtonsProps) {
  return (
    <motion.div className={(className ? `${className} ` : '') + 'flex gap-x-4'} layout='position' transition={{ duration: 0.1 }}>
      <Button
        hidden={isPrevHidden}
        disabled={!isPrevActive}
        onClick={onPrevClick}
        className='text-xl font-medium'
        isAlt
      >
        {prev ? prev : <BiArrowBack size={25} />}
      </Button>
      <Button
        hidden={isNextHidden}
        disabled={isHasFinish ? false : !isNextActive}
        className='text-xl font-medium'
        onClick={onNextClick}
        form={nextForm}
        isAlt
      >
        {next
          ? next
          : isHasFinish
          ? isNextActive
            ? 'Далее'
            : 'Завершить'
          : 'Далее'}
      </Button>
    </motion.div>
  );
}
