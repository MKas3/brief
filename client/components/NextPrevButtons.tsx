import { Button } from '@/components/Button';
import { BiArrowBack } from 'react-icons/bi';
import React from 'react';

type NextPrevButtonsProps = {
  isPrevActive?: boolean;
  isNextActive?: boolean;
  isHasFinish?: boolean;
  onPrevClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
  nextForm?: string;
};

export default function NextPrevButtons({
  isPrevActive,
  isNextActive,
  isHasFinish,
  onPrevClick,
  onNextClick,
  nextForm,
}: NextPrevButtonsProps) {
  return (
    <>
      <Button disabled={!isPrevActive} onClick={onPrevClick} isAlt>
        <BiArrowBack size={25} />
      </Button>
      <Button
        disabled={isHasFinish ? false : !isNextActive}
        className='text-xl font-medium'
        onClick={onNextClick}
        form={nextForm}
        isAlt
      >
        {isHasFinish ? (isNextActive ? 'Далее' : 'Завершить') : 'Далее'}
      </Button>
    </>
  );
}
