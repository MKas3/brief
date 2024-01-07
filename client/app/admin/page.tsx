'use client';

import { useQuery } from 'react-query';
import UserService from '@/services/user.service';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { ADMIN_ROUTE } from '@/utils/consts';
import NextPrevButtons from '@/components/NextPrevButtons';

export default function AdminPage() {
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(3);
  const { data, refetch } = useQuery(['users', skip, take], () =>
    UserService.findAll(skip, take),
  );
  const router = useRouter();

  const pushToUserPage = (id: string) => {
    router.push(ADMIN_ROUTE + `/user/${id}`);
  };

  const deleteUser = async (id: string) => {
    await UserService.delete(id);
    refetch();
  };

  return (
    <div className='m-12 mt-24 rounded-xl bg-neutral-800 p-6 ring-2 ring-black/10 ring-offset-2 ring-offset-black/5'>
      <h3 className='mb-4 text-center text-xl font-semibold'>Пользователи</h3>
      <div className='mb-4'>
        {data?.length === 0 && (
          <div className='text-center'>Пользователей нет</div>
        )}
        {data?.map((value, index) => (
          <div key={index} className='p-2'>
            <span>{value.id}. </span>
            <span>{value.name}</span>
            <div className='pl-4 text-white/50'>
              <div>Почта: {value.email}</div>
              <div>Роль: {value.role}</div>
            </div>
            <div className='my-1 flex gap-x-2'>
              <Button
                className='enabled:px-3 enabled:py-1.5'
                isAlt
                onClick={() => pushToUserPage(value.id)}
              >
                Узнать больше
              </Button>
              <Button
                className='bg-red-700 hover:bg-red-800 enabled:px-3 enabled:py-1.5'
                isAlt
                onClick={() => deleteUser(value.id)}
              >
                Удалить
              </Button>
            </div>
          </div>
        ))}
      </div>
      <NextPrevButtons
        isPrevActive={skip > 0}
        isNextActive={data && data.length > 0}
        onPrevClick={() => setSkip((prev) => prev - take)}
        onNextClick={() => setSkip((prev) => prev + take)}
        className='justify-center'
      />
    </div>
  );
}
