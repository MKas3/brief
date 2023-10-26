'use client';

import { useMemo, useState } from 'react';
import {
  HiChartBar,
  HiFolder,
  HiOutlineChartBar,
  HiOutlineFolder,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiSquares2X2,
  HiUser,
} from 'react-icons/hi2';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/user.recoil';

export default function ProfileBlock() {
  const [user, setUser] = useRecoilState(userState);
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
  const pages = ['Главная', 'Заказчики', 'Проекты', 'Статистика'];
  const icons = [
    <HiOutlineSquares2X2 key={0} />,
    <HiOutlineUser key={1} />,
    <HiOutlineFolder key={2} />,
    <HiOutlineChartBar key={3} />,
  ];
  const fillIcons = [
    <HiSquares2X2 key={0} />,
    <HiUser key={1} />,
    <HiFolder key={2} />,
    <HiChartBar key={3} />,
  ];

  return (
    <div className='absolute inset-0 flex text-neutral-900'>
      <div className='ml-5 flex h-full flex-col gap-y-3 border-r border-neutral-200 pr-5 pt-2 text-lg'>
        {pages.map((el, index) => (
          <button key={index} onClick={() => setCurrentPage(index)}>
            <div
              className={
                (currentPage === index
                  ? 'font-semibold text-neutral-900 '
                  : 'font-medium text-neutral-500 ') +
                'flex w-full items-center justify-between gap-x-12 text-start transition hover:text-neutral-700'
              }
            >
              <div className='flex items-center gap-x-2'>
                {currentPage === index ? fillIcons[index] : icons[index]}
                <span className='text-xs'>{el}</span>
              </div>
              {currentPage === index ? icons[index] : fillIcons[index]}
            </div>
          </button>
        ))}
      </div>
      <div className='w-full'>
        <div className='flex w-full items-center justify-center gap-x-1 py-3 text-xs font-medium'>
          Нужен полный доступ?
          <button className='underline underline-offset-1'>
            Начни бесплатный пробный период
          </button>
        </div>
        <div className='relative w-full space-y-2 bg-[url("/start.jpg")] bg-cover bg-center px-16 py-6 text-white'>
          <p className='text-sm font-medium'>{currentDate}</p>
          <h1 className='text-xl font-extrabold'>Добрый день, {user?.name}</h1>
        </div>
      </div>
    </div>
  );
}
