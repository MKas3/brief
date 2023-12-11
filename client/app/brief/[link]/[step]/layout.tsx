'use client';

import { STEPS_COUNT } from '@/utils/consts';
import { Paginate } from '@/components/BriefSteps/Paginate/Paginate';
import React, { useContext, useEffect, useState } from 'react';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import ErrorPage from '@/app/error';
import { useRouter } from 'next/navigation';
import { BriefContext } from '@/components/Brief/BriefContext';
import { useRecoilState } from 'recoil';
import { briefLinkState, newBriefState, nextBriefEditingPageState } from "@/store/brief.recoil";
import BriefService from '@/services/brief.service';
import { CorrectionModal } from '@/components/BriefSteps/Modals/CorrectionModal';

export default function BriefStepLayout({
  children,
  params: { step },
}: {
  children: React.ReactNode;
  params: { step: string };
}) {
  const [brief, setBrief] = useContext(BriefContext);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [newBrief] = useRecoilState(newBriefState);
  const [link] = useRecoilState(briefLinkState);
  const { refetch } = BriefService.useUpdate(link, newBrief);
  const [nextBriefEditingPage, setNextBriefEditingPage] = useRecoilState(nextBriefEditingPageState);

  const handlePageChange = (selected: number) => {
    setPage(selected);
  };

  const canChange = (page: number) => {
    if (!brief.lastAction) return true;
    if (brief.title === '') return false;
    return page <= brief.lastAction;
  };

  useEffect(() => {
    if (
      step !== 'steps' &&
      (isNaN(Number(step)) ||
        Number(step) > STEPS_COUNT ||
        Number(step) <= 0) &&
      canChange(Number(step))
    )
      setIsError(true);
    else
      setPage(
        step === 'steps' ? (brief.lastAction ?? 1) - 1 : Number(step) - 1,
      );
  }, [step]);

  useEffect(() => {
    refetch().then((res) => {
      setBrief(res.data.data);
    });
  }, [newBrief, refetch, setBrief]);

  useEffect(() => {
    if (!nextBriefEditingPage && (brief.incorrect?.some((el: boolean) => el)))
      setCorrectionModalOpen(true);
  }, [brief, setCorrectionModalOpen, correctionModalOpen]);

  if (isError)
    return <ErrorPage error={new Error('Step param is not a valid number')} />;

  return (
    <BriefStepContext.Provider value={[page, setPage]}>
      <div className='flex flex-col gap-y-5 flex-1 h-full'>
        <Paginate
          className='z-10 mb-14 mt-6 items-center justify-center'
          maxLeft={5}
          pageCount={STEPS_COUNT}
          onPageChange={handlePageChange}
          canChange={canChange}
        />
        <div className='flex flex-col h-full flex-1 justify-center'>
          {children}
        </div>
      </div>
      <CorrectionModal
        visible={correctionModalOpen}
        onClose={() => setCorrectionModalOpen(false)}
        brief={brief}
      />
    </BriefStepContext.Provider>
  );
}
