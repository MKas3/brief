'use client';

import Loading from '@/app/loading';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BRIEFS_ROUTE } from '@/utils/consts';

export default function LinkPage({
  params: { link },
}: {
  params: { link: string };
}) {
  const router = useRouter();
  useEffect(() => {
    router.push(BRIEFS_ROUTE + `/${link}/steps`);
  }, []);

  return (
    <div className='h-fit min-h-screen bg-white py-9 text-black'>
      <Loading />
    </div>
  );
}
