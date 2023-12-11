import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  interactionChannels: string;
};

export default function BriefStep5() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 8 шагов'
      imageSource='/steps/step5.png'
      imageClassName='-top-[12.5rem] -right-[14.5rem] h-auto w-auto sm:translate-y-[15%]'
      formId='step-5'
      inputTitle='Какие каналы взаимодействия с целевой аудиторией вы используете?'
      inputName='interactionChannels'
      actionNumber={5}
      description='*Это могут быть соц.сети, ларек, супермаркет, рекламные баннеры, документация и т.д'
    />
  );
}
