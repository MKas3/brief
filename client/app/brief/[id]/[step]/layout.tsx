'use client';

import { STEPS_COUNT } from '@/utils/consts';
import { Paginate } from '@/components/BriefSteps/Paginate/Paginate';
import { useContext, useState } from 'react';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import ErrorPage from '@/app/error';
import { useRouter } from 'next/navigation';
import { BriefContext } from '@/components/Brief/BriefContext';

export default function BriefStepLayout({
  children,
  params: { step },
}: {
  children: React.ReactNode;
  params: { step: string };
}) {
  const [brief] = useContext(BriefContext);
  const [page, setPage] = useState(step === 'steps' ? 0 : Number(step) - 1);
  const router = useRouter();

  const handlePageChange = (selected: number) => {
    setPage(selected);
  };

  const canChange = (page: number) => {
    if (!brief.lastAction) return true;
    return page <= brief.lastAction;
  };

  if (
    step !== 'steps' &&
    (isNaN(Number(step)) || Number(step) > STEPS_COUNT || Number(step) <= 0)
  )
    return <ErrorPage error={new Error('Step param is not a valid number')} />;

  return (
    <BriefStepContext.Provider value={[page, setPage]}>
      <div className='flex flex-col gap-y-5'>
        <Paginate
          className='z-10 mb-14 mt-6 items-center justify-center'
          maxLeft={5}
          pageCount={STEPS_COUNT}
          onPageChange={handlePageChange}
          canChange={canChange}
        />
        {children}
      </div>
    </BriefStepContext.Provider>
  );
}
