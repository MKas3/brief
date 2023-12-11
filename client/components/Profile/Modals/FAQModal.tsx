import { ModalBase } from '@/components/Modal/ModalBase';
import React from 'react';
import { Modal } from '@/components/Modal/Modal';
import { ModalLabel } from '@/components/Modal/ModalLabel';
import Image from 'next/image';
import NextPrevButtons from "@/components/NextPrevButtons";

type FAQModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const FAQModal = ({ visible, onClose }: FAQModalProps) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={
        <div className='mb-6 flex items-baseline gap-x-4 border-b border-[#cccccc] pb-6'>
          <h1 className='text-5xl font-bold'>FAQ:</h1>
          <p className='text-3xl font-medium'>
            Ответы и идеи от команды BriefMe
          </p>
        </div>
      }
    >
      <div className='flex flex-col gap-y-6'>
        <ModalLabel
          labelDigit='1'
          title='Что такое бриф? И для чего он нужен?'
          description='Бриф — это список вопросов, который помогает исполнителю лучше понять заказчика, его видение проекта и обеспечить ожидаемый результат сотрудничества. Обычно в документе прописывают особенности продукта и ЦА компании, пожелания, дедлайн и размер бюджета.'
        />
        <div className='flex gap-x-10'>
          <ModalLabel labelDigit='2' title='Как работать с BriefMe?'>
            <div className='flex flex-col gap-y-4 text-lg font-medium'>
              <span>
                Вся работа начинается с исполнителя, которому необходимо нажать
                кнопку “Создать бриф” в своем личном кабинете.
              </span>
              <span>
                В появившемся окне необходимо скопировать ссылку и отправить ее
                напрямую заказчикку.
              </span>
              <span>
                Ссылка работает некоторое время, ваша задача успеть отдать ее
                заказчику, который планирует заказать у вас логотип.
              </span>
              <span>
                Самое время узнать что находится в данной ссылке. Это
                полноценный бриф с ответом на все необходимые вопросы от
                заказчика, после заполнения которых вы сможете приступить к
                работе.
              </span>
              <span>
                В ходе заполнения брифа каждый заказчик столкнется с
                предпоследним шагом, где необходимо сгенирировать необходимое
                количество изображений с помощью нейросети, чтобы продолжить
                работу.
              </span>
              <span>
                После всех процедур у вас есть возможность получить готовый
                заполненный бриф в личном кабинете, в котором собрана вся
                необходимая информация с визуализацией, которая поможет вам
                начать работу.
              </span>
            </div>
          </ModalLabel>
          <div className='flex h-full w-1/3 flex-shrink-0 flex-col gap-y-[5vh]'>
            { Array.from({ length: 3 }).map((el, index) => (
              <div className='h-1/3 relative' key={index}>
                <Image
                  src={`/faq/${index + 1}.jpg`}
                  alt='FAQ Picture'
                  layout='fill'
                  objectFit='contain'
                />
              </div>
            )) }

          </div>
        </div>
        <ModalLabel labelDigit='3' title='Почему нужно пользоваться BriefMe?'>
          <div className='flex flex-col gap-y-4 text-lg font-medium'>
            <span>
              А все просто, BriefMe спасает вас от самого главного, а именно от
              безрезультативных переговоров с заказчиком. Вы даете бриф,
              получаете конечный файл с предварительной визуализацией вашей
              конечной работы с помощью нейронной сети.
            </span>
            <span>
              Вместо того, чтобы тратить время на выяснения необходимых
              требований, вы можете спокойно отдать заказчику ссылку, а сами
              заниматься другой работой.
            </span>
          </div>
        </ModalLabel>
        <NextPrevButtons className='justify-center' next='Завершить' isPrevHidden isNextActive onNextClick={onClose} />
      </div>
    </Modal>
  );
};
