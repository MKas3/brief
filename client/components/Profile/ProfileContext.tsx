'use client';

import BriefService from '@/services/brief.service';
import { useRecoilState } from 'recoil';
import { briefsState, needUpdateBriefsState } from "@/store/brief.recoil";
import { useEffect } from 'react';

type ProfileContextProps = {
  children?: React.ReactNode;
};

export default function ProfileContext({ children }: ProfileContextProps) {
  const [needUpdate, setNeedUpdate] = useRecoilState(needUpdateBriefsState);
  const [briefs, setBriefs] = useRecoilState(briefsState);

  useEffect(() => {
    const getBriefs = async () => {
      try {
        const resBriefs = await BriefService.findAll(50, 0);
        setBriefs(resBriefs);
      } catch (e) {
        throw e;
      }
    };
    if (needUpdate)
      getBriefs().catch().finally(() => setNeedUpdate(false));
  }, [setBriefs, needUpdate, setNeedUpdate]);

  return <>{children}</>;
}
