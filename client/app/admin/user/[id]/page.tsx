'use client';

import { useQuery } from 'react-query';
import UserService from '@/services/user.service';
import { useState } from 'react';
import BriefService from '@/services/brief.service';
import { Button } from '@/components/Button';
import { IResponseBrief } from '@/types/brief.types';
import { BriefModal } from '@/components/Profile/Modals/BriefModal/BriefModal';
import NextPrevButtons from '@/components/NextPrevButtons';

export default function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: user } = useQuery(['user', id], () => UserService.find(+id));
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(3);
  const { data: briefs, refetch } = useQuery(
    ['briefs', skip, take, user?.id],
    () => BriefService.findAllByUser(skip, take, +(user?.id ?? -1)),
  );
  const [currentBrief, setCurrentBrief] = useState<IResponseBrief>();
  const [briefModalVisible, setBriefModalVisible] = useState(false);

  const openBriefExtra = (brief: IResponseBrief) => {
    setCurrentBrief(brief);
    setBriefModalVisible(true);
  };

  const deleteBrief = async (briefId: number) => {
    await BriefService.removeAdmin(briefId);
    refetch();
  };

  if (!user) return null;

  return (
    <>
      <div className='m-12 mt-24 rounded-xl bg-neutral-800 p-6 ring-2 ring-black/10 ring-offset-2 ring-offset-black/5'>
        <h3 className='mb-4 text-center text-xl font-semibold'>
          Пользователь {user.name}
        </h3>
        <div>
          <div>ID: {user.id}</div>
          <div>Имя: {user.name}</div>
          <div>Почта: {user.email}</div>
          <div>Роль: {user.role}</div>
          <div className='mt-4'>Брифы:</div>
          <div className='mb-4'>
            {briefs?.length === 0 && (
              <div className='text-center'>Брифов нет</div>
            )}
            {briefs?.map((value, index) => (
              <div key={index} className='p-2'>
                <span>{value.id}. </span>
                <span>{value.title}</span>
                <div className='my-1 flex gap-x-2'>
                  <Button
                    className='enabled:px-3 enabled:py-1.5'
                    isAlt
                    onClick={() => openBriefExtra(value)}
                  >
                    Узнать больше
                  </Button>
                  <Button
                    className='bg-red-700 hover:bg-red-800 enabled:px-3 enabled:py-1.5'
                    isAlt
                    onClick={() => deleteBrief(value.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <NextPrevButtons
            isPrevActive={skip > 0}
            isNextActive={briefs && briefs.length > 0}
            onPrevClick={() => setSkip((prev) => prev - take)}
            onNextClick={() => setSkip((prev) => prev + take)}
            className='justify-center'
          />
        </div>
      </div>
      <BriefModal
        brief={currentBrief}
        visible={briefModalVisible}
        onClose={() => setBriefModalVisible(false)}
        onCompleteBrief={() => {}}
        hasCompleteButton={false}
      />
    </>
  );
}
