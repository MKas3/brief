import { Modal } from '@/components/Modal/Modal';
import { useCallback, useEffect, useMemo, useState } from "react";
import NextPrevButtons from '@/components/NextPrevButtons';
import { useRecoilState } from 'recoil';
import { briefsState } from '@/store/brief.recoil';
import UserService from '@/services/user.service';
import { Progress } from '@/types/progress.types';
import { motion, Variants } from 'framer-motion';
import { IClient, IResponseBrief } from '@/types/brief.types';
import { FaCheck, FaTrashCan, FaXmark } from 'react-icons/fa6';
import BriefService from '@/services/brief.service';

type BriefsModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectBrief: (brief: IResponseBrief) => void;
  selectedCategory: number;
  onSelectCategory: (index: number) => void;
  onShowBrief: (brief: IResponseBrief) => void;
  onDeleteBrief: (brief: IResponseBrief) => void;
};

const text: Variants = {
  unselected: {
    fontSize: '20px',
    fontWeight: 500,
  },
  selected: {
    fontSize: '36px',
    fontWeight: 700,
  },
};

export const BriefsModal = ({
  visible,
  onClose,
  onSelectBrief,
  selectedCategory,
  onSelectCategory,
  onShowBrief,
  onDeleteBrief,
}: BriefsModalProps) => {
  const [briefToLink, setBriefToLink] = useState<IResponseBrief>();
  const [briefs] = useRecoilState(briefsState);
  const [clients, setClients] = useState<IClient[]>([]);
  const { refetch } = BriefService.useFindLink(briefToLink?.id ?? -1);
  const [copiedBriefId, setCopiedBriefId] = useState(-1);

  const briefsByCategory = useMemo(() => {
    switch (selectedCategory) {
      case 0: {
        return briefs.filter((el) => el.progress === Progress.IN_PROGRESS);
      }
      case 1: {
        return briefs.filter(
          (el) => el.completed && el.progress === Progress.PENDING,
        );
      }
      case 2: {
        return briefs
          .filter((el) => !el.completed)
          .toSorted((el1, el2) =>
            el1.incorrectMessage
              ? el2.incorrectMessage
                ? 0
                : -1
              : el2.incorrectMessage
              ? 1
              : 0,
          );
      }
      case 3: {
        return clients;
      }
      default: {
        return briefs;
      }
    }
  }, [briefs, selectedCategory]);

  const refetchLink = useCallback((briefId: number) => {
    refetch().then((res) => {
      if (res.data?.data?.link) {
        navigator.clipboard.writeText(
          `${window.location.origin}/brief/` + res.data.data.link,
        );
        setCopiedBriefId(briefId);
      }
    });
  }, [refetch]);

  const onCopyLink = (brief: IResponseBrief) => {
    if (brief === briefToLink) refetchLink(brief.id);
    else setBriefToLink(brief);
  };

  const categories = [
    'Проекты в работе',
    'Выполненные брифы',
    'Незавершенные брифы',
    'Заказчики',
  ];

  useEffect(() => {
    const getClients = async () => {
      setClients(await UserService.findAllClient());
    };
    getClients();
  }, [briefs]);

  useEffect(() => {
    if (briefToLink) refetchLink(briefToLink.id);
    else setCopiedBriefId(-1);
  }, [briefToLink, refetchLink]);

  return (
    <Modal visible={visible} onClose={onClose} className='h-full'>
      <div className='sticky top-0 mb-6 flex flex-col items-start justify-center gap-y-2 bg-white pb-4'>
        {categories.map((el, index) => (
          <motion.button
            className={
              (selectedCategory === index
                ? 'before:bg-black '
                : 'before:bg-[#C3C3C3] ') +
              'flex items-center text-xl before:mr-5 before:h-5 before:w-5 before:shrink-0 before:rounded-full before:transition '
            }
            key={index}
            onClick={() => onSelectCategory(index)}
            variants={text}
            animate={selectedCategory === index ? 'selected' : 'unselected'}
          >
            {el}
          </motion.button>
        ))}
      </div>
      <motion.div
        className='mb-6 flex h-full flex-col gap-y-5 rounded-3xl border border-[#C3C3C3] p-6'
        layout='position'
        layoutScroll
        transition={{ duration: 0.1 }}
      >
        {briefsByCategory.length === 0 && (
          <span className='m-auto text-xl font-medium'>Нету элементов</span>
        )}
        {briefsByCategory.map((el, index) => (
          <div
            key={index}
            className={`flex justify-between rounded-3xl border border-[#C3C3C3] p-4 ${
              !el.title && 'text-neutral-400'
            }`}
          >
            <span className='text-xl'>
              {index + 1}. {el.title ? el.title : 'В процессе заполнения'}
            </span>
            {selectedCategory === 0 ? (
              <button
                type='button'
                className='px-2 text-sm font-medium text-[#DF2020]'
                onClick={() => onShowBrief(el as IResponseBrief)}
              >
                Просмотр проекта
              </button>
            ) : selectedCategory === 1 ? (
              <button
                type='button'
                className='px-2 text-sm font-medium'
                onClick={() => onSelectBrief(el as IResponseBrief)}
              >
                Утвердить
              </button>
            ) : selectedCategory === 2 ? (
              <div className='flex gap-x-2'>
                <button
                  type='button'
                  className='px-2 text-sm font-medium'
                  onClick={() => onCopyLink(el as IResponseBrief)}
                >
                  {copiedBriefId === (el as IResponseBrief).id ? (
                    <FaCheck color='green' />
                  ) : (
                    'Скопировать ссылку'
                  )}
                </button>
                <button
                  type='button'
                  className='px-2 text-sm font-semibold text-[#DF2020]'
                  onClick={() => onDeleteBrief(el as IResponseBrief)}
                >
                  <FaXmark size='1.5rem' />
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </motion.div>
      <NextPrevButtons
        className='sticky bottom-0 justify-center bg-white'
        onPrevClick={() =>
          onSelectCategory(
            selectedCategory - 1 < 0
              ? categories.length - 1
              : selectedCategory - 1,
          )
        }
        onNextClick={() =>
          onSelectCategory(
            selectedCategory + 1 > categories.length - 1
              ? 0
              : selectedCategory + 1,
          )
        }
        isPrevActive
        isNextActive
      />
    </Modal>
  );
};
