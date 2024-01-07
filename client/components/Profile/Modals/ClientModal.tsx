import { Input } from '@/components/Input';
import { FaCheck } from 'react-icons/fa6';
import { IoDocumentsOutline } from 'react-icons/io5';
import { HiOutlineArrowPath } from 'react-icons/hi2';
import { QRCodeSVG } from 'qrcode.react';
import { ModalBase } from '@/components/Modal/ModalBase';
import React from 'react';
import { Modal } from '@/components/Modal/Modal';
import { ModalLabel } from '@/components/Modal/ModalLabel';

type ClientModalProps = {
  visible: boolean;
  copyClicked: boolean;
  briefLink: string;
  onClose: () => void;
  copyLink: () => void;
  regenerateLink: (getNewLink: boolean) => void;
};

export const ClientModal = ({
  visible,
  copyClicked,
  briefLink,
  onClose,
  copyLink,
  regenerateLink,
}: ClientModalProps) => {
  return (
    <Modal
      titleText='Пришло время создать бриф'
      visible={visible}
      onClose={onClose}
    >
      <ModalLabel
        labelDigit='1'
        title='Давай пригласим заказчика'
        description='Поделись с ним ссылкой или QR-кодом и ожидайте заполнения брифа.'
      />
      <div className='mb-6 flex'>
        <Input
          className='w-full cursor-pointer'
          inputClassName='pr-14 pointer-events-auto hover:bg-black/5 transition'
          blockClassName='relative pointer-events-none'
          onClick={() => copyLink()}
          readOnly={true}
          value={briefLink}
        >
          {copyClicked ? (
            <FaCheck
              color='green'
              size='1.75rem'
              className='absolute bottom-0 right-0 top-0 my-auto mr-5'
            />
          ) : (
            <IoDocumentsOutline
              color='gray'
              size='1.75rem'
              className='absolute bottom-0 right-0 top-0 my-auto mr-5'
            />
          )}
        </Input>
        <button
          type='submit'
          className='ml-3 flex aspect-square h-full items-center justify-center rounded-xl border-2 border-zinc-300 transition hover:bg-black/5'
          onClick={() => regenerateLink(true)}
        >
          <HiOutlineArrowPath color='gray' size='1.75rem' />
        </button>
      </div>
      <div className='flex sm:flex-col sm:gap-y-6'>
        <div className='flex flex-col gap-y-6'>
          <ModalLabel
            labelDigit='2'
            title='Запасись терпением'
            description='Заказчику необходимо ответить на все вопросы в брифе, каждый из которых вы можете видеть в своих проектах.'
          />
          <ModalLabel
            labelDigit='3'
            title='Довольствуйся результатом'
            description='Ты получишь сборный бриф со всеми требованиями по предстоящей работе с демонстрационным вариантом логотипа.'
          />
        </div>
        <div className='flex w-1/3 sm:w-full items-center justify-center'>
          <QRCodeSVG value={briefLink} />
        </div>
      </div>
    </Modal>
  );
};
