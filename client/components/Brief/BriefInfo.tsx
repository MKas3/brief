'use client';

import { useRecoilState } from 'recoil';
import OpenaiService from '@/services/openai.service';
import { useForm } from 'react-hook-form';
import SafeInput from '@/components/SafeInput';
import BriefImageService from '@/services/brief-image.service';
import { MAX_AI_IMAGES } from '@/utils/consts';
import { useEffect } from 'react';
import {
  briefImagesState,
  briefLoadingState,
  selectedBriefImagesState,
} from '@/store/brief-images.recoil';

type BriefInfoProps = {
  brief: IResponseBrief;
  className?: string;
};

const colors = [
  'text-red-500',
  'text-orange-500',
  'text-yellow-500',
  'text-lime-500',
  'text-green-500',
];

type FormValues = {
  prompt: string;
};

function BriefInfo({ brief, className }: BriefInfoProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const [briefImages, setBriefImages] = useRecoilState(briefImagesState);
  const [selectedBriefImages, setSelectedBriefImages] = useRecoilState(
    selectedBriefImagesState,
  );
  const [briefLoading, setBriefLoading] = useRecoilState(briefLoadingState);

  const handleGeneration = async (data: FormValues) => {
    setBriefLoading(true);
    if (briefImages.length >= MAX_AI_IMAGES) return;

    const images = await OpenaiService.GenerateImage(data.prompt, 4, '256x256');
    const newImages = images.map((el) => ({ path: el.url }));

    for (const image of newImages)
      await BriefImageService.create(brief.id, image);

    setBriefImages([...briefImages, ...newImages]);
    setBriefLoading(false);
  };

  useEffect(() => {
    const getAllImages = async (briefId: number) => {
      const images = await BriefImageService.findAll(briefId);
      if (images) setBriefImages(images);
    };
    getAllImages(brief.id);
  }, [brief.id, setBriefImages]);

  return (
    <div
      className={(className ? `${className} ` : '') + 'w-full space-y-4 p-6'}
    >
      <div className='flex flex-col'>
        <p className='mb-4 max-w-fit border-b-2 border-zinc-800 pb-1'>
          Images Selected:
          <span className={'ml-1.5 ' + colors[selectedBriefImages.length]}>
            {selectedBriefImages.length} / 4
          </span>
        </p>
        <form onSubmit={handleSubmit(handleGeneration)}>
          <SafeInput
            title='Prompt'
            placeholder='Prompt...'
            register={register}
            registerTitle='prompt'
            registerOptions={{ required: true }}
          />
          <button className='mt-4 rounded border-2 border-rose-700 px-4 py-2 transition hover:bg-rose-600/10'>
            Generate Images
          </button>
        </form>
      </div>
    </div>
  );
}

export default BriefInfo;
