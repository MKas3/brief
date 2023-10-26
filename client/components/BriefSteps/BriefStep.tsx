import Image from 'next/image';
import React, { useContext } from 'react';
import NextPrevButtons from '@/components/NextPrevButtons';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import { STEPS_COUNT } from '@/utils/consts';

export type BriefStepProps = {
  children?: React.ReactNode;
  stepsLeftText?: string;
  imageSource?: string;
  imageClassName?: string;
  nextForm?: string;
  description?: string;
};

export default function BriefStep({
  children,
  stepsLeftText,
  imageClassName,
  imageSource,
  nextForm,
  description,
}: BriefStepProps) {
  const [page, setPage] = useContext(BriefStepContext);

  const handleNextClick = () => {
    if (!nextForm) setPage(Math.min(page + 1, STEPS_COUNT - 1));
  };

  const handlePrevClick = () => {
    setPage(Math.max(page - 1, 0));
  };

  return (
    <div className='relative flex px-52'>
      <div className='z-10 flex w-1/2 flex-col'>
        <h1 className='mb-14 text-6xl font-bold'>{stepsLeftText}</h1>
        {children}
        <div className='mt-8 flex items-center justify-center gap-x-4'>
          <NextPrevButtons
            isPrevActive={page > 0}
            isNextActive={page < STEPS_COUNT - 1}
            isHasFinish={true}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            nextForm={nextForm}
          />
        </div>
        <p className='mb-4 mt-8 text-center text-sm font-medium'>
          {description}
        </p>
      </div>

      {imageSource && (
        <Image
          className={
            (imageClassName ? `${imageClassName} ` : '') +
            'pointer-events-none absolute bottom-0 translate-x-6 self-center'
          }
          src={imageSource}
          alt=''
          width={1200}
          height={1200}
        />
      )}
    </div>
  );
}
