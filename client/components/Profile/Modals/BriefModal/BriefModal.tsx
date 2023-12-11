import { Modal } from '@/components/Modal/Modal';
import { ModalLabel } from '@/components/Modal/ModalLabel';
import Image from 'next/image';
import NextPrevButtons from '@/components/NextPrevButtons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BriefModalField } from '@/components/Profile/Modals/BriefModal/BriefModalField';
import { TextArea } from '@/components/TextArea';
import { NumericRange } from '@/types/numeric-range.types';
import { useRecoilState } from 'recoil';
import {
  briefsState,
  needUpdateBriefsState,
  newBriefState,
} from '@/store/brief.recoil';
import BriefService from '@/services/brief.service';
import { Progress } from '@/types/progress.types';
import { IResponseBrief } from '@/types/brief.types';

type BriefModalProps = {
  visible: boolean;
  onClose: () => void;
  onCompleteBrief: (brief: IResponseBrief) => void;
  brief?: IResponseBrief;
  isIncorrectMode?: boolean;
};

export const BriefModal = ({
  visible,
  onClose,
  onCompleteBrief,
  brief,
  isIncorrectMode = false,
}: BriefModalProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [briefs, setBriefs] = useRecoilState(briefsState);
  const [, setNeedUpdateBriefs] = useRecoilState(needUpdateBriefsState);
  const [incorrect, setIncorrect] = useState<boolean[]>(
    new Array<boolean>(12).fill(false, 0, 12),
  );
  const [incorrectMessage, setIncorrectMessage] = useState('');

  const isIncorrect = useMemo(() => {
    return (
      isIncorrectMode && (!!incorrectMessage || incorrect.some((el) => el))
    );
  }, [incorrect, incorrectMessage, isIncorrectMode]);

  const { refetch: refetchIncorrect } = BriefService.useAuthUpdate(
    brief?.id ?? -1,
    {
      incorrect,
      incorrectMessage,
    },
  );

  const { refetch: refetchInProgress } = BriefService.useAuthUpdate(
    brief?.id ?? -1,
    {
      progress: Progress.IN_PROGRESS,
    },
  );

  const handleSelect = (i: number, selected: boolean) => {
    setIncorrect((prev) =>
      prev.map((el, index) => (index === i ? selected : el)),
    );
  };

  const completeClick = () => {
    if (isIncorrectMode) {
      if (isIncorrect) {
        if (incorrectMessage === '') {
          ref.current?.focus();
          return;
        } else if (!incorrect.some((el) => el)) return;
        refetchIncorrect().then(() => setNeedUpdateBriefs(true));
      } else refetchInProgress().then(() => setNeedUpdateBriefs(true));
    } else if (brief) onCompleteBrief(brief);
    onClose();
  };

  useEffect(() => {
    if (brief && isIncorrectMode) {
      if (brief.incorrect && brief.incorrect.length > 0)
        setIncorrect(brief.incorrect);
      if (brief.incorrectMessage) setIncorrectMessage(brief.incorrectMessage);
    }
  }, [setIncorrect, setIncorrectMessage, brief, isIncorrectMode]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={
        <div className='mb-6 flex items-baseline gap-x-6 border-b border-[#cccccc] pb-6'>
          <h1 className='text-5xl font-bold'>Бриф от:</h1>
          <p className='text-xl font-bold'>ФИО: {brief?.clientName}</p>
          <p className='text-xl font-bold'>Email: {brief?.clientEmail}</p>
        </div>
      }
    >
      <div className='flex flex-col gap-y-6'>
        <p className='text-2xl font-bold'>
          Поставь точку рядом с пунктом, если в нём допущена ошибка
        </p>
        <BriefModalField
          labelDigit='1'
          title='Как называется ваша компания/проект?'
          inputValue={brief?.title}
          value={incorrect[0]}
          onSelect={(selected) => handleSelect(0, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='2'
          title='Чем занимается ваша компания?'
          inputValue={brief?.companyClasses}
          value={incorrect[1]}
          onSelect={(selected) => handleSelect(1, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='3'
          title='Что означает ваше название?'
          inputValue={brief?.description}
          value={incorrect[2]}
          onSelect={(selected) => handleSelect(2, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='4'
          title='Каким цветом вы хотите логотип?'
          inputValue={brief?.emotions}
          value={incorrect[3]}
          onSelect={(selected) => handleSelect(3, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='5'
          title='Какие каналы взаимодействия с целевой аудиторией вы используете?'
          inputValue={brief?.interactionChannels}
          value={incorrect[4]}
          onSelect={(selected) => handleSelect(4, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='6'
          title='Опишите вашего клиента. Кто он? '
          inputValue={brief?.clientDescription}
          value={incorrect[5]}
          onSelect={(selected) => handleSelect(5, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='7'
          title='Кто ваши конкуренты?'
          inputValue={brief?.concurrents}
          value={incorrect[6]}
          onSelect={(selected) => handleSelect(6, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='8'
          title='Какая у вас ценовая категория относительно конкурентов?'
          inputValue={brief?.worth}
          value={incorrect[7]}
          onSelect={(selected) => handleSelect(7, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='9'
          title='Оцените свою готовность к экспериментам и смелым, нестандартным решениям от 1 до 10?'
          inputValue={brief?.experiments}
          value={incorrect[8]}
          onSelect={(selected) => handleSelect(8, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='10'
          title='Сколько человек принимает окончательное решение?'
          inputValue={brief?.endPeople}
          value={incorrect[9]}
          onSelect={(selected) => handleSelect(9, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <BriefModalField
          labelDigit='11'
          title='Введите запрос для генерации логотипа от нейросети.'
          inputValue={brief?.prompt}
          value={incorrect[10]}
          onSelect={(selected) => handleSelect(10, selected)}
          isIncorrectMode={isIncorrectMode}
        />
        <div className='flex flex-wrap rounded-3xl border-2 border-[#cccccc] p-8'>
          {brief?.selectedImages?.length === 0 && (
            <p className='text-center text-lg font-medium w-full'>
              Изображения отсутствуют
            </p>
          )}
          {brief?.selectedImages?.map((el, index) => (
            <Image
              key={index}
              src={el.path}
              alt='AI Image'
              width={256}
              height={256}
              className='rounded-xl'
            />
          ))}
        </div>
        {isIncorrectMode && (
          <div className='ml-4 flex flex-col gap-y-4'>
            <p className='text-2xl font-bold'>
              Осталось одобрить или оформить правки по брифу:
            </p>
            <p className='text-sm font-bold'>
              *Если вам что-то непонравилось, напишите об этом заказчику,
              предварительно не забыв указать ошибку в необходимых пунктах брифа
            </p>
            <TextArea
              defaultValue={brief?.incorrectMessage}
              onChange={(e) => setIncorrectMessage(e.currentTarget.value)}
              ref={ref}
            />
          </div>
        )}
        <NextPrevButtons
          className='justify-center'
          next={
            !isIncorrectMode
              ? 'Завершить работу'
              : isIncorrect
              ? 'Отправить обратно'
              : 'Начать работу'
          }
          prev='Назад'
          isNextActive
          isPrevActive
          onNextClick={completeClick}
          onPrevClick={onClose}
        />
      </div>
    </Modal>
  );
};
