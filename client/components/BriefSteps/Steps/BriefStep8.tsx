import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  worth: string;
};

export default function BriefStep8() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 5 шагов'
      imageSource='/steps/step8.png'
      imageClassName='-top-[20rem] -right-[14.5rem] h-auto w-auto'
      formId='step-8'
      inputTitle='Какая у вас ценовая категория относительно конкурентов?'
      inputName='worth'
      actionNumber={8}
      description='*Дороже/дешевле, при этом укажите чем вы уступаете, качеством, количеством или характеристиками.'
    />
  );
}
