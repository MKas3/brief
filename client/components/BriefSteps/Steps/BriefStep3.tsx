import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  description: string;
};

export default function BriefStep3() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 10 шагов'
      imageSource='/steps/step3.png'
      imageClassName='-top-[13rem] -right-[20rem] h-auto w-auto -scale-x-100'
      formId='step-3'
      inputTitle='Что означает ваше название?'
      inputName='description'
      actionNumber={3}
      description='*Речь идет о глубоком смысле: подтекст, фамилия, ассоциация, который вкладывается в название компании'
    />
  );
}
