import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  title: string;
};

export default function BriefStep1() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 12 шагов'
      imageSource='/steps/step1.png'
      imageClassName='-top-[20rem] -right-[14.5rem] h-auto w-auto'
      formId='step-1'
      inputTitle='Как называется ваша компания/проект?'
      inputName='title'
      actionNumber={1}
      description='*Напишите название именно так, как оно будет отображено в логотипе (С учётом регистра и пробелов)'
    />
  );
}
