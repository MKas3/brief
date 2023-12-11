import React from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';

type FormValues = {
  concurrents: string;
};

export default function BriefStep7() {
  return (
    <DefaultBriefStep<FormValues>
      stepsLeftText='Осталось 6 шагов'
      imageSource='/steps/step7.png'
      imageClassName='-top-[5rem] -right-[17.5rem] h-auto w-auto sm:translate-y-[-20%] sm:scale-[85%]'
      formId='step-7'
      inputTitle='Кто ваши конкуренты?'
      inputName='concurrents'
      actionNumber={7}
      description='*Есть ли среди них тот, на кого вы хотите быть похожи?'
    />
  );
}
