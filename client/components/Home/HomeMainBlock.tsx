'use client';

import { useRouter } from 'next/navigation';
import { BRIEFS_ROUTE } from '@/utils/consts';
import { Button } from '@/components/Button';

export function HomeMainBlock() {
  const router = useRouter();

  return (
    <div className='z-10 flex flex-col justify-center'>
      <div className='ml-48'>
        <h1 className='mb-6 flex max-w-[60%] text-4xl font-bold'>
          Теперь ты сам знаешь что нужно
        </h1>
        <p className='mb-10 max-w-[60%] text-lg'>
          Объясни за 5 минут то, что не мог объяснить часами
        </p>
        <div className='relative h-16 w-64'>
          <Button onClick={() => router.push(BRIEFS_ROUTE)}>
            Оформить бриф
          </Button>
        </div>
      </div>
    </div>
  );
}
