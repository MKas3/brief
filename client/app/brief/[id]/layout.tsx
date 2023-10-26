'use client';

import { BriefContext } from '@/components/Brief/BriefContext';
import { useEffect, useState } from 'react';
import BriefService from '@/services/brief.service';
import Loading from '@/app/loading';
import ErrorPage from '@/app/error';

export default function BriefIdLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const [briefId] = useState(id);
  const [brief, setBrief] = useState<IResponseBrief>({} as IResponseBrief);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    const getBrief = async () => {
      const brief = await BriefService.findOne(briefId);
      if (brief) {
        setBrief(brief);
        setHasResult(true);
      }
    };
    getBrief()
      .catch((e) => setBrief({} as IResponseBrief))
      .finally(() => setIsLoading(false));
  }, [briefId]);

  if (isLoading) return <Loading />;

  if (!hasResult) return <ErrorPage error={new Error('Brief not found')} />;

  return (
    <BriefContext.Provider value={[brief, setBrief]}>
      {children}
    </BriefContext.Provider>
  );
}
