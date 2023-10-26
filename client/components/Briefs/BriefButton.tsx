'use client';

import { Button } from '@/components/Button';
import BriefService from '@/services/brief.service';
import { useRecoilState } from 'recoil';
import { briefsState } from '@/store/brief.recoil';
import { useRouter } from 'next/navigation';
import { BRIEFS_ROUTE } from '@/utils/consts';

type BriefButtonProps = {
  className?: string;
};

export default function BriefButton({ className }: BriefButtonProps) {
  const [briefs, setBriefs] = useRecoilState(briefsState);
  const router = useRouter();

  const createBrief = async () => {
    const newBrief = await BriefService.create({ title: 'Логотип' });
    if (newBrief) {
      setBriefs([...briefs, newBrief]);
      router.push(BRIEFS_ROUTE + `/${newBrief.id}/steps`);
    }
  };

  return (
    <div className={className}>
      <span className='mr-16 text-xl'>Выбери или создай бриф:</span>
      <Button className='rounded-2xl px-16' onClick={createBrief}>
        Создать новый
      </Button>
    </div>
  );
}
