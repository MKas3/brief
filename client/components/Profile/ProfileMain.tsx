'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  HiChartBar,
  HiFolder,
  HiInformationCircle,
  HiOutlineArrowPath,
  HiOutlineChartBar,
  HiOutlineFolder,
  HiOutlineInformationCircle,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiSquares2X2,
  HiUser,
  HiUserCircle,
} from 'react-icons/hi2';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/user.recoil';
import ProfileBlocks from '@/components/Profile/ProfileBlocks/ProfileBlocks';
import { ModalBase } from '@/components/Modal/ModalBase';
import { Input } from '@/components/Input';
import {
  briefsState,
  generatedBriefLinkState,
  needUpdateBriefsState,
} from '@/store/brief.recoil';
import { useRouter } from 'next/navigation';
import { IoDocumentsOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';
import BriefService from '@/services/brief.service';
import UserService from '@/services/user.service';
import { QRCodeSVG } from 'qrcode.react';
import { ClientModal } from '@/components/Profile/Modals/ClientModal';
import { FAQModal } from '@/components/Profile/Modals/FAQModal';
import { BriefModal } from '@/components/Profile/Modals/BriefModal/BriefModal';
import { BriefsModal } from '@/components/Profile/Modals/BriefsModal/BriefsModal';
import { Progress } from '@/types/progress.types';
import { IResponseBrief } from '@/types/brief.types';
import { FiPlus } from 'react-icons/fi';

export default function ProfileMain() {
  const [user, setUser] = useRecoilState(userState);
  const [briefLink, setBriefLink] = useRecoilState(generatedBriefLinkState);
  const [, setNeedUpdateBriefs] = useRecoilState(needUpdateBriefsState);
  const [currentPage, setCurrentPage] = useState(0);
  const currentDate = useMemo(() => {
    const date = new Date();
    let stringDate = date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    stringDate = stringDate[0].toUpperCase() + stringDate.substring(1);
    return stringDate;
  }, []);

  const [copyClicked, setCopyClicked] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const router = useRouter();
  const { refetch: refetchLink } = BriefService.useGenerateLink();
  const { refetch: refetchLastLink } = BriefService.useFindLastLink();

  const [faqModalOpen, setFaqModalOpen] = useState(false);

  const [briefModalOpen, setBriefModalOpen] = useState(false);

  const [isIncorrectMode, setIsIncorrectMode] = useState(false);
  const [selectedBrief, setSelectedBrief] = useState<IResponseBrief>();
  const [selectedBriefsCategory, setSelectedBriefsCategory] = useState(0);
  const [briefsModalOpen, setBriefsModalOpen] = useState(false);

  const [mustComplete, setMustComplete] = useState<IResponseBrief>();
  const { refetch } = BriefService.useAuthUpdate(selectedBrief?.id ?? -1, {
    progress: Progress.DONE,
  });

  const setPage = (index: number) => {
    if (index === 4) setFaqModalOpen(true);
    else setCurrentPage(index);
  };

  const closeFaq = () => {
    setFaqModalOpen(false);
    UserService.setFAQViewed();
  };

  const addClient = () => {
    setClientModalOpen(true);
  };

  const copyLink = () => {
    setCopyClicked(true);
    navigator.clipboard.writeText(briefLink);
  };

  const regenerateLink = useCallback(
    async (getNewLink = false) => {
      setCopyClicked(false);

      if (getNewLink)
        refetchLink().then((res2) => {
          if (res2.data) {
            setBriefLink(
              `${window.location.origin}/brief/` + res2.data.data.link,
            );
            setNeedUpdateBriefs(true);
          }
        });
      else
        await refetchLastLink().then((res) => {
          if (res.data)
            setBriefLink(
              `${window.location.origin}/brief/` + res.data.data.link,
            );
          else
            setBriefLink(
              'Нажми кнопку создания ссылки справа, чтобы создать ссылку',
            );
        });
    },
    [setBriefLink],
  );

  const showBrief = (brief: IResponseBrief) => {
    setSelectedBrief(brief);
    setIsIncorrectMode(false);
    setBriefModalOpen(true);
  };

  const completeBrief = (brief: IResponseBrief) => {
    setMustComplete(brief);
  };

  const selectBrief = (brief: IResponseBrief) => {
    setSelectedBrief(brief);
    setIsIncorrectMode(true);
    setBriefModalOpen(true);
  };

  const deleteBrief = (brief: IResponseBrief) => {
    BriefService.remove(brief.id).then(() => {
      regenerateLink();
      setNeedUpdateBriefs(true);
    });
  };

  const pages = ['Главная', 'Заказчики', 'Проекты', 'Профиль', 'FAQ'];
  const icons = [
    <HiOutlineSquares2X2 key={0} />,
    <HiOutlineUser key={1} />,
    <HiOutlineFolder key={2} />,
    <HiOutlineUserCircle key={3} />,
    <HiOutlineInformationCircle key={4} />,
  ];
  const fillIcons = [
    <HiSquares2X2 key={0} />,
    <HiUser key={1} />,
    <HiFolder key={2} />,
    <HiUserCircle key={3} />,
    <HiInformationCircle key={4} />,
  ];

  useEffect(() => {
    regenerateLink();
  }, [user, regenerateLink]);

  useEffect(() => {
    if (mustComplete)
      refetch()
        .then(() => setNeedUpdateBriefs(true))
        .finally(() => setMustComplete(undefined));
  }, [mustComplete, refetch]);

  useEffect(() => {
    if (!UserService.checkFAQViewed()) setFaqModalOpen(true);
  }, []);

  return (
    <>
      <div className='mx-[15vw] mb-16 mt-9 flex flex-col text-neutral-900 lg:mx-[10vw] md:mx-[5vw]'>
        <div className='w-full'>
          <div className='flex w-full justify-between gap-x-4 sm:px-[10vw] rounded-3xl bg-[url("/start.jpg")] bg-cover bg-center px-16 py-6 text-white sm:flex-col sm:gap-y-4'>
            <div className='flex flex-col gap-y-2'>
              <p className='text-sm font-medium sm:text-xs'>{currentDate}</p>
              <h1 className='whitespace-nowrap text-xl font-extrabold md:text-lg sm:text-base'>
                Добрый день, {user?.name}
              </h1>
            </div>
            <button
              className='whitespace-nowrap rounded-full sm:hidden bg-white px-11 py-4 text-xl font-semibold text-black drop-shadow-[0px_0px_10px_#FFF] transition hover:bg-white/75 lg:px-8 lg:py-3 lg:text-lg md:px-5 sm:text-base'
              onClick={addClient}
            >
              <span className='md:hidden sm:block'>Создать бриф</span>
              <FiPlus className='hidden md:block sm:hidden' />
            </button>
          </div>
        </div>
        <div className='mt-3 flex gap-x-[3vw] overflow-hidden drop-shadow-[0px_4px_5px_#999]'>
          <div className='flex flex-col items-center justify-center gap-y-3'>
            <span className='text-xs font-medium'>Меню</span>
            <div className='profile container flex h-full w-48 flex-col sm:w-36'>
              {pages.map((el, index) => (
                <button key={index} onClick={() => setPage(index)}>
                  <div
                    className={
                      (currentPage === index
                        ? 'font-semibold text-neutral-900 '
                        : 'font-medium text-neutral-500 ') +
                      'flex w-full items-center gap-x-12 transition hover:text-neutral-700 sm:justify-center'
                    }
                  >
                    <div className='flex items-center gap-x-2 text-lg'>
                      <div className='sm:hidden'>
                        {currentPage === index
                          ? fillIcons[index]
                          : icons[index]}
                      </div>
                      <span className='text-xs'>{el}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <ProfileBlocks
            currentPage={currentPage}
            onClickAddClient={addClient}
            onCompletedClick={() => {
              setSelectedBriefsCategory(1);
              setBriefsModalOpen(true);
            }}
            onUncompletedClick={() => {
              setSelectedBriefsCategory(2);
              setBriefsModalOpen(true);
            }}
            onInWorkClick={() => {
              setSelectedBriefsCategory(0);
              setBriefsModalOpen(true);
            }}
            onCompletedProjectsClick={() => {
              setBriefsModalOpen(true);
            }}
          />
        </div>
      </div>
      <ClientModal
        visible={clientModalOpen}
        copyClicked={copyClicked}
        briefLink={briefLink}
        onClose={() => setClientModalOpen(false)}
        copyLink={copyLink}
        regenerateLink={regenerateLink}
      />
      <FAQModal visible={faqModalOpen} onClose={() => closeFaq()} />
      <BriefsModal
        visible={briefsModalOpen}
        onClose={() => setBriefsModalOpen(false)}
        onSelectBrief={selectBrief}
        selectedCategory={selectedBriefsCategory}
        onSelectCategory={setSelectedBriefsCategory}
        onShowBrief={showBrief}
        onDeleteBrief={deleteBrief}
      />
      <BriefModal
        visible={briefModalOpen}
        onClose={() => setBriefModalOpen(false)}
        brief={selectedBrief}
        isIncorrectMode={isIncorrectMode}
        onCompleteBrief={completeBrief}
      />
    </>
  );
}
