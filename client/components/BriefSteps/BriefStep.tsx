import Image from 'next/image';
import React, { useContext } from 'react';
import NextPrevButtons from '@/components/NextPrevButtons';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import { HOME_ROUTE, STEPS_COUNT } from '@/utils/consts';
import { BriefContext } from '@/components/Brief/BriefContext';
import { useRecoilState } from 'recoil';
import { briefLinkState, newBriefState } from '@/store/brief.recoil';
import { useRouter } from 'next/navigation';
import { IRequestBrief } from "@/types/brief.types";

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
  const [brief] = useContext(BriefContext);
  const [link] = useRecoilState(briefLinkState);
  const [, setNewBrief] = useRecoilState(newBriefState);
  const router = useRouter();

  const handleNextClick = async () => {
    if (page === STEPS_COUNT - 1) {
      setNewBrief((prev: IRequestBrief) => ({ ...prev, completed: true, lastAction: 12 }));
      router.push(HOME_ROUTE);
    } else if (!nextForm) setPage(Math.min(page + 1, STEPS_COUNT - 1));
  };

  const handlePrevClick = () => {
    setPage(Math.max(page - 1, 0));
  };

  return (
    <div className='relative flex px-[15vw] sm:px-[10vw]'>
      <div className='z-10 flex w-1/2 sm:w-full sm:mt-[27.5vh] flex-col'>
        <h1 className='mb-14 text-6xl sm:text-3xl sm:text-center sm:mb-2 font-bold'>{stepsLeftText}</h1>
        {children}
        <div className='mt-8 flex sm:order-1 sm:mt-0 items-center justify-center gap-x-4'>
          <NextPrevButtons
            isPrevActive={page > 0}
            isNextActive={page < STEPS_COUNT - 1}
            isHasFinish={true}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            nextForm={nextForm}
          />
        </div>
        <p className='mb-4 mt-8 sm:text-start sm:text-[10px] sm:leading-4 sm:mt-4 text-center text-sm font-medium'>
          {description}
        </p>
      </div>

      {imageSource && (
        <Image
          className={
            (imageClassName ? `${imageClassName} ` : '') +
            'pointer-events-none absolute bottom-0 translate-x-6 self-center sm:left-0 sm:translate-x-0'
          }
          src={imageSource}
          alt=''
          width={1200}
          height={1200}
          loading='eager'
        />
      )}
    </div>
  );
}
