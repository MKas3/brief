import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  experiments: number;
};

export default function BriefStep9() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 4 шага'
      imageSource='/steps/step9.png'
      imageClassName='-top-[12.5rem] -right-[22.5rem] h-auto w-auto -scale-x-100'
      formId='step-9'
      inputTitle='Оцените свою готовность к экспериментам и смелым, нестандартным решениям от 1 до 10?'
      inputName='experiments'
      inputType='number'
      inputRules={{
        min: 0,
        max: 10,
        valueAsNumber: true,
      }}
      actionNumber={9}
      description='*(1 - консервативное решение, 10 - полная свобода реализации)'
    />
  );
}
