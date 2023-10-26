'use client';

import { useContext, useEffect, useMemo } from 'react';
import BriefStep1 from '@/components/BriefSteps/Steps/BriefStep1';
import BriefStep2 from '@/components/BriefSteps/Steps/BriefStep2';
import BriefStep3 from '@/components/BriefSteps/Steps/BriefStep3';
import BriefStep4 from '@/components/BriefSteps/Steps/BriefStep4';
import BriefStep5 from '@/components/BriefSteps/Steps/BriefStep5';
import BriefStep6 from '@/components/BriefSteps/Steps/BriefStep6';
import BriefStep7 from '@/components/BriefSteps/Steps/BriefStep7';
import BriefStep8 from '@/components/BriefSteps/Steps/BriefStep8';
import BriefStep9 from '@/components/BriefSteps/Steps/BriefStep9';
import BriefStep10 from '@/components/BriefSteps/Steps/BriefStep10';
import BriefStep11 from '@/components/BriefSteps/Steps/BriefStep11';
import BriefStep12 from '@/components/BriefSteps/Steps/BriefStep12';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import { BriefContext } from '@/components/Brief/BriefContext';
import BriefService from '@/services/brief.service';

export default function BriefStepPage() {
  const [page, setPage] = useContext(BriefStepContext);
  const [brief, setBrief] = useContext(BriefContext);

  const pagesArr = useMemo(
    () => [
      <BriefStep1 key={1} />,
      <BriefStep2 key={2} />,
      <BriefStep3 key={3} />,
      <BriefStep4 key={4} />,
      <BriefStep5 key={5} />,
      <BriefStep6 key={6} />,
      <BriefStep7 key={7} />,
      <BriefStep8 key={8} />,
      <BriefStep9 key={9} />,
      <BriefStep10 key={10} />,
      <BriefStep11 key={11} />,
      <BriefStep12 key={12} />,
    ],
    [],
  );

  useEffect(() => {
    const getBrief = async () => {
      const updatedBrief = await BriefService.findOne(brief.id);
      if (updatedBrief) setBrief(updatedBrief);
    };
    getBrief().catch((e) => setBrief({} as IResponseBrief));
  }, [page, setBrief]);

  return <div>{pagesArr[page]}</div>;
}
