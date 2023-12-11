import { useState } from 'react';
import { IResponseBrief } from "@/types/brief.types";

type BriefsContainerProps = {
  buttonTitle: string;
  briefs: IResponseBrief[];
  maxBriefs?: number;
  onClick?: () => void;
};

export default function BriefsContainer({
  buttonTitle,
  briefs,
  onClick,
  maxBriefs = 3,
}: BriefsContainerProps) {
  const handleButtonClick = () => {
    if (onClick)
      onClick();
  }

  return (
    <div className='mb-12 flex h-full w-full flex-col'>
      <div className='flex flex-col'>
        {briefs.slice(0, maxBriefs).map((el, index) => (
          <span
            key={index}
            className={`flex h-8 select-none items-center border-b border-[#cccccc] ${!el.title && 'text-neutral-400'}`}
          >
            {
              `${index + 1}. ${el.title ? el.title : 'В процессе заполнения'}`
            }
          </span>
        ))}
      </div>
      <button
        type='button'
        className='btn profile absolute bottom-0 left-0 right-0 mb-5 mt-5'
        onClick={() => handleButtonClick()}
      >
        {buttonTitle}
      </button>
    </div>
  );
}
