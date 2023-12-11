'use client';

import { BriefContext } from '@/components/Brief/BriefContext';
import { useEffect, useState } from 'react';
import BriefService from '@/services/brief.service';
import Loading from '@/app/loading';
import ErrorPage from '@/app/error';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { briefLinkState } from '@/store/brief.recoil';
import { IRequestBrief, IResponseBrief } from "@/types/brief.types";

export default function BriefIdLayout({
  children,
  params: { link },
}: {
  children: React.ReactNode;
  params: { link: string };
}) {
  const [brief, setBrief] = useState<IRequestBrief>({} as IRequestBrief);
  const {
    data: parsedBrief,
    isLoading,
    refetch,
    isFetched,
    isError,
  } = useQuery('brief', async () => await BriefService.findOneByLink(link), {
    enabled: false,
    keepPreviousData: true,
  });

  const [currentLink, setCurrentLink] = useRecoilState(briefLinkState);

  useEffect(() => {
    refetch().then((res) => {
      setBrief(res.data ?? ({} as IResponseBrief));
    });
    setCurrentLink(link);
  }, [refetch, setCurrentLink, link]);

  if (isLoading) return <Loading />;

  if (isError || !isFetched)
    return <ErrorPage error={new Error('Brief not found')} />;

  return (
    <BriefContext.Provider value={[brief, setBrief]}>
      {children}
    </BriefContext.Provider>
  );
}
