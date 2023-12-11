import BriefStep from '@/components/BriefSteps/BriefStep';
import { Input } from '@/components/Input';
import React, { useContext, useEffect, useState } from 'react';
import { ModalBase } from '@/components/Modal/ModalBase';
import Tags from '@/components/BriefSteps/Tags/Tags';
import TagsService from '@/services/tags.service';
import BriefImages from '@/components/Brief/BriefImages';
import { Button } from '@/components/Button';
import { MAX_AI_IMAGES } from '@/utils/consts';
import OpenaiService from '@/services/openai.service';
import BriefImageService from '@/services/brief-image.service';
import { useRecoilState } from 'recoil';
import {
  activeTagsState,
  briefImagesState,
  briefLoadingState,
  requiredTagsState,
  selectedBriefImagesState,
} from '@/store/brief-images.recoil';
import { BriefContext } from '@/components/Brief/BriefContext';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import { ITag } from '@/types/tag.types';
import { briefLinkState, newBriefState } from '@/store/brief.recoil';
import { IRequestBrief } from '@/types/brief.types';

type FormValues = {
  prompt: string;
};

export default function BriefStep11() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const [link] = useRecoilState(briefLinkState);
  const [activeTags] = useRecoilState(activeTagsState);
  const [requiredTags] = useRecoilState(requiredTagsState);
  const [briefImages, setBriefImages] = useRecoilState(briefImagesState);
  const [selectedBriefImages] = useRecoilState(selectedBriefImagesState);
  const [briefLoading, setBriefLoading] = useRecoilState(briefLoadingState);
  const [brief] = useContext(BriefContext);
  const [page, setPage] = useContext(BriefStepContext);
  const { register, handleSubmit } = useForm<FormValues>();
  const [prompt, setPrompt] = useState('');
  const [mustGenerateImages, setMustGenerateImages] = useState(false);
  const {
    data: images,
    isLoading,
    refetch,
  } = useQuery(
    ['aiImages', prompt],
    async () => await OpenaiService.GenerateImage(prompt, 4, '256x256'),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  );
  const [, setNewBrief] = useRecoilState(newBriefState);

  const handleFinishModal = () => {
    setIsModalVisible(false);
  };

  const generateImages = async (data: FormValues) => {
    if (briefImages.length >= MAX_AI_IMAGES || !data.prompt) return;

    const promptTags = `${requiredTags
      .map((el) => el.tagName)
      .join(' ')} ${activeTags.map((el) => el.tagName).join(' ')} `;

    setPrompt(promptTags + data.prompt);

    setMustGenerateImages(true);

    setBriefLoading(true);
  };

  const handleChange = async (data: FormValues) => {
    const incorrect = brief.incorrect?.map((el, index) =>
      index === 10 ? false : el,
    );
    setNewBrief((prev: IRequestBrief) => ({
      ...prev,
      lastAction: 11,
      ...(incorrect && incorrect.length > 0 ? { incorrect } : null),
    }));
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const getTags = async () => {
      setTags(await TagsService.getTags());
    };
    getTags();
  }, []);

  useEffect(() => {
    if (!mustGenerateImages) return;

    setMustGenerateImages(false);

    refetch()
      .then(async (data) => {
        const images = data.data;
        if (!images || !prompt) return;

        setNewBrief((prev: IRequestBrief) => ({
          lastAction: 11,
          prompt: prompt.replace(/^.+? {3,}/g, ''),
        }));

        const newImages = images.map((el) => ({ path: el.url }));

        for (const image of newImages)
          await BriefImageService.create(link, image);

        setBriefImages([...briefImages, ...newImages]);
      })
      .finally(() => {
        setBriefLoading(false);
      });
  }, [prompt, refetch]);

  return (
    <>
      <BriefStep
        stepsLeftText='Осталось 2 шага'
        imageSource='/steps/step11.png'
        imageClassName='-top-[10rem] -right-[14.5rem] h-auto w-auto sm:scale-[80%]'
        nextForm='step-11'
        description='*Чем точнее будет запрос, тем качественне будет результат'
      >
        <form
          id='step-11'
          onSubmit={handleSubmit(handleChange)}
          className='flex h-full flex-row gap-x-4'
        >
          <Input
            onClick={() => setIsModalVisible(true)}
            title='Введите запрос для генерации логотипа от нейросети.'
            inputClassName='font-medium'
            defaultValue={brief.prompt}
            {...register('prompt')}
          />
        </form>
      </BriefStep>
      <ModalBase
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <form onSubmit={handleSubmit(generateImages)} className='flex w-full'>
          <div className='flex max-h-full w-1/2 flex-col overflow-y-auto px-1'>
            <h1 className='text-4xl font-bold'>Задайте запрос нейросети</h1>
            <p className='mt-6 text-xs'>
              *Опишите ваше представление будущего логотипа. <br />
              Пример: Логотип магазин слон индийский чай текст снизу три цвета
              высокое качество
            </p>
            <Input
              inputClassName='font-medium'
              className='mb-6'
              defaultValue={brief.prompt}
              autoFocus
              {...register('prompt')}
            />
            <Tags tags={tags} />
          </div>
          <div className='flex w-1/2 flex-col'>
            <p className='text-center text-xs'>
              *Выберите до 4 понравившихся изображений
            </p>
            <div className='scrollbar my-6 h-full overflow-y-auto'>
              <BriefImages />
            </div>

            {selectedBriefImages.length >= 1 ? (
              <Button
                type='button'
                onClick={handleFinishModal}
                className='mx-auto'
                isAlt={true}
              >
                Завершить
              </Button>
            ) : (
              <Button
                className='mx-auto'
                disabled={briefImages.length >= MAX_AI_IMAGES}
                isAlt={true}
              >
                {briefImages.length < MAX_AI_IMAGES
                  ? 'Сгенерировать'
                  : 'Максимум 4 изображения'}
              </Button>
            )}
          </div>
        </form>
      </ModalBase>
    </>
  );
}
