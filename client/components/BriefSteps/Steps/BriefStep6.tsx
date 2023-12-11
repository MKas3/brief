import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  clientDescription: string;
};

export default function BriefStep6() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 7 шагов'
      imageSource='/steps/step6.png'
      imageClassName='-top-[10rem] -right-[17.5rem] h-auto w-auto -scale-x-100 sm:scale-[80%]'
      formId='step-6'
      inputTitle='Опишите вашего клиента. Кто он?'
      inputName='clientDescription'
      actionNumber={6}
      description='*Пример: "Замужняя женщина высокого достатка, домохозяйка, ориентируется на внешний вид продукции..."'
    />
  );
}
