'use client';

import { useRouter } from 'next/navigation';
import { PROFILE_ROUTE } from '@/utils/consts';
import { Button } from '@/components/Button';
import { useRecoilState } from "recoil";
import { userState } from "@/store/user.recoil";

export function HomeMainBlock() {
  const router = useRouter();
  const [user] = useRecoilState(userState);

  return (
    <div className='z-10 flex flex-col justify-center text-white'>
      <div className='ml-[10vw] w-[80vw]'>
        <h1 className='mb-6 flex max-w-[60%] sm:max-w-[100%] text-4xl font-bold'>
          Теперь ты сам знаешь что нужно
        </h1>
        <p className='mb-10 max-w-[60%] sm:max-w-[100%] text-lg'>
          Объясни за 5 минут то, что не мог объяснить часами
        </p>
        <div className='relative h-16 sm:justify-center flex max-w-[100%]'>
          <Button onClick={() => router.push(PROFILE_ROUTE)}>
            {user ? 'Начать работу' : 'Оформить бриф' }
          </Button>
        </div>
      </div>
    </div>
  );
}
