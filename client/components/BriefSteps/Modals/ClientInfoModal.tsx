import SafeInput from '@/components/SafeInput';
import NextPrevButtons from '@/components/NextPrevButtons';
import { ModalBase } from '@/components/Modal/ModalBase';
import React from 'react';
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { Modal } from '@/components/Modal/Modal';

export type ModalFormValues = {
  clientEmail: string;
  clientName: string;
};

type ClientInfoModalProps = {
  visible: boolean;
  onClose: () => void;
  handleSubmit: UseFormHandleSubmit<ModalFormValues>;
  handleSubmitParam: (data: ModalFormValues) => void;
  register: UseFormRegister<ModalFormValues>;
};

export const ClientInfoModal = ({
  visible,
  onClose,
  handleSubmit,
  handleSubmitParam,
  register,
}: ClientInfoModalProps) => {
  return (
    <Modal visible={visible} onClose={onClose} canClose={false}>
      <h1 className='mb-6 text-5xl font-bold sm:text-2xl'>
        Добрый день, давайте начнём работу
      </h1>
      <p className='mb-6'>
        Вас пригласили заполнить бриф, чтобы в разы упростить вашу работу,
        поэтому для начала:
      </p>
      <form
        onSubmit={handleSubmit(handleSubmitParam)}
        className='flex h-full flex-col justify-between sm:justify-start'
      >
        <div>
          <div className='flex gap-x-5 text-3xl font-medium sm:gap-x-3 sm:text-lg'>
            <span className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-black sm:h-10 sm:w-10 sm:border'>
              1
            </span>
            <div className='mt-1.5 flex flex-col gap-y-4'>
              <span>Впишите ваше имя и фамилию:</span>
            </div>
          </div>
          <SafeInput
            className='mb-6 w-full'
            inputClassName='hover:bg-black/5 transition'
            placeholder='Иван Иванов'
            register={register}
            registerTitle='clientName'
            registerOptions={{
              required: true,
              minLength: 1,
            }}
          />
        </div>
        <div>
          <div className='flex gap-x-5 text-3xl font-medium sm:gap-x-3 sm:text-lg'>
            <span className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-black sm:h-10 sm:w-10 sm:border'>
              2
            </span>
            <div className='mt-1.5 flex flex-col gap-y-4'>
              <span>Напишите вашу почту:</span>
            </div>
          </div>
          <SafeInput
            className='w-full'
            inputClassName='hover:bg-black/5 transition mb-6'
            placeholder='primerbrief@brief.me'
            register={register}
            registerTitle='clientEmail'
            registerOptions={{
              required: true,
              minLength: 1,
              pattern: /^\S+@\S+\.\S+$/,
            }}
          />
        </div>
        <NextPrevButtons className='justify-center self-end' isPrevHidden isNextActive />
      </form>
    </Modal>
  );
};
