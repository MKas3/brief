import BriefStep from '@/components/BriefSteps/BriefStep';
import React from 'react';

type FormValues = {
  title: string;
};

export default function BriefStep12() {
  return (
    <BriefStep
      stepsLeftText='Финишная прямая'
      imageSource='/steps/step12.png'
      imageClassName='-top-[10rem] -right-[14.5rem] h-auto w-auto'
      nextForm='step-12'
    >
      <p className='text-center text-xl font-medium'>Проверьте ваш бриф</p>
    </BriefStep>
  );
}
