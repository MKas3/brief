import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  emotions: string;
};

export default function BriefStep4() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 9 шагов'
      imageSource='/steps/step4.png'
      imageClassName='-top-[13rem] -right-[20rem] h-auto w-auto -scale-x-100 sm:translate-y-[8%]'
      formId='step-4'
      inputTitle='Каким цветом вы хотите логотип?'
      inputName='emotions'
      actionNumber={4}
      description='*Данный вопрос поможет сформировать полную картину со стороны визуального восприятия.'
    />
  );
}
