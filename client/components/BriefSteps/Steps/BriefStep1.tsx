import React, { useContext, useEffect, useState } from 'react';
import DefaultBriefStep from '@/components/BriefSteps/DefaultBriefStep';
import { BriefContext } from '@/components/Brief/BriefContext';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { briefLinkState, newBriefState } from '@/store/brief.recoil';
import { ClientInfoModal, ModalFormValues } from "@/components/BriefSteps/Modals/ClientInfoModal";

type FormValues = {
  title: string;
};

export default function BriefStep1() {
  const [brief] = useContext(BriefContext);
  const [link] = useRecoilState(briefLinkState);
  const [clientModelOpen, setClientModalOpen] = useState(false);
  const { register, handleSubmit } = useForm<ModalFormValues>();
  const [newBrief, setNewBrief] = useRecoilState(newBriefState);

  const handleSubmitClientInfo = async (data: ModalFormValues) => {
    if (!data.clientEmail || !data.clientName) {
      setClientModalOpen(true);
      return;
    }

    setNewBrief({ ...newBrief, ...data, lastAction: 1 });
    setClientModalOpen(false);
  };

  useEffect(() => {
    if (brief.lastAction == undefined) setClientModalOpen(true);
  }, []);

  return (
    <>
      <DefaultBriefStep<FormValues>
        stepsLeftText='Осталось 12 шагов'
        imageSource='/steps/step1.png'
        imageClassName='-top-[20rem] -right-[14.5rem] h-auto w-auto sm:translate-y-1/3 sm:scale-90'
        formId='step-1'
        inputTitle='Как называется ваша компания/проект?'
        inputName='title'
        actionNumber={1}
        description='*Напишите название именно так, как оно будет отображено в логотипе (С учётом регистра и пробелов)'
      />
      <ClientInfoModal
        visible={clientModelOpen}
        onClose={() => setClientModalOpen(false)}
        handleSubmit={handleSubmit}
        handleSubmitParam={handleSubmitClientInfo}
        register={register}
      />
    </>
  );
}
