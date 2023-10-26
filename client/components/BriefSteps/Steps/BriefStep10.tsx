import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  endPeople: number;
};

export default function BriefStep10() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 3 шага'
      imageSource='/steps/step10.png'
      imageClassName='-top-[8rem] -right-[14.5rem] h-auto w-auto'
      formId='step-10'
      inputTitle='Сколько человек принимает окончательное решение?'
      inputName='endPeople'
      inputType='number'
      inputRules={{
        min: 0,
        valueAsNumber: true,
      }}
      actionNumber={10}
      description='*Чем меньше человек, тем проще прийти к конечному результату'
    />
  );
}
