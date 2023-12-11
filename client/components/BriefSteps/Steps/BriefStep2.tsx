import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  companyClasses: string;
};

export default function BriefStep2() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 11 шагов'
      imageSource='/steps/step2.png'
      imageClassName='-top-[13rem] -right-[20rem] h-auto w-auto -scale-x-100 sm:translate-y-[10%]'
      formId='step-2'
      inputTitle='Чем занимается ваша компания?'
      inputName='companyClasses'
      actionNumber={2}
      description='*Опишите сферу деятельности вашей компании/проекта максимально простым языком, чтобы донести точную идею'
    />
  );
}
