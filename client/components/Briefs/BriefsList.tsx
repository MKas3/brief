'use client';

import BriefCard from '@/components/Briefs/BriefCard';
import { useEffect, useState } from 'react';
import NextPrevButtons from '@/components/NextPrevButtons';
import { useRecoilState } from 'recoil';
import { briefsState } from '@/store/brief.recoil';
import BriefService from '@/services/brief.service';
import { MAX_BRIEFS_TAKE } from '@/utils/consts';

export default function BriefsList() {
  const [briefs, setBriefs] = useRecoilState(briefsState);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getBriefs = async () => {
      const resBriefs = await BriefService.findAll(
        MAX_BRIEFS_TAKE,
        (page - 1) * MAX_BRIEFS_TAKE,
      );
      setBriefs(resBriefs);
    };
    getBriefs();
  }, [page, setBriefs]);

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex w-2/3 flex-col gap-y-2 rounded-2xl bg-zinc-100 px-8 py-8 shadow-lg shadow-black/25'>
        {briefs.length === 0 && 'Нет элементов'}
        {briefs.map((el, index) => (
          <BriefCard key={index} brief={el} />
        ))}
      </div>
      <div className='flex w-2/3 items-center justify-center gap-x-4'>
        <NextPrevButtons
          isPrevActive={page > 1}
          isNextActive={page >= 1}
          onPrevClick={() => setPage(page - 1)}
          onNextClick={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
}
