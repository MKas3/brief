'use client';

import { useForm } from 'react-hook-form';
import SafeInput from '@/components/SafeInput';
import BriefService from '@/services/brief.service';
import { useRouter } from 'next/navigation';
import { BRIEFS_ROUTE } from '@/utils/consts';
import { useRecoilState } from 'recoil';
import { selectedBriefImagesState } from '@/store/brief-images.recoil';

type BriefFormProps = {
  brief: IResponseBrief;
  className?: string;
};

type FormValues = {
  title: string;
  description: string;
};

function BriefForm({ brief, className }: BriefFormProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const [selectedBriefImages] = useRecoilState(selectedBriefImagesState);
  const router = useRouter();

  const handleFinish = async (data: FormValues) => {
    if (selectedBriefImages.length < 4) return;
    const brief = await BriefService.create({});
    router.push(BRIEFS_ROUTE);
  };

  return (
    <div
      className={
        (className ? `${className} ` : '') +
        'min-w-fit border-r-2 border-zinc-800 p-6'
      }
    >
      <form
        onSubmit={handleSubmit(handleFinish)}
        className='flex flex-col gap-y-4 '
      >
        <SafeInput<FormValues>
          title='Logo Title'
          placeholder='Title...'
          register={register}
          registerTitle='title'
          registerOptions={{ required: true, value: brief.title }}
        />
        <SafeInput<FormValues>
          title='Logo Description'
          placeholder='Description...'
          register={register}
          registerTitle='description'
          registerOptions={{ required: true, value: brief.description }}
        />
        <button className='mt-2 rounded bg-rose-700 px-4 py-2 transition hover:bg-rose-600'>
          Finish Brief
        </button>
      </form>
    </div>
  );
}

export default BriefForm;
