import BriefStep from '@/components/BriefSteps/BriefStep';
import { Input } from '@/components/Input';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from '@/components/Modal';
import Tags from '@/components/BriefSteps/Tags/Tags';
import TagsService from '@/services/tags.service';
import BriefImages from '@/components/Brief/BriefImages';
import { Button } from '@/components/Button';
import { MAX_AI_IMAGES } from '@/utils/consts';
import OpenaiService from '@/services/openai.service';
import BriefImageService from '@/services/brief-image.service';
import { useRecoilState } from 'recoil';
import {
  briefImagesState,
  selectedBriefImagesState,
} from '@/store/brief-images.recoil';
import { BriefContext } from '@/components/Brief/BriefContext';
import { useForm } from 'react-hook-form';
import BriefService from '@/services/brief.service';

type FormValues = {
  prompt: string;
};

export default function BriefStep11() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [briefImages, setBriefImages] = useRecoilState(briefImagesState);
  const [selectedBriefImages] = useRecoilState(selectedBriefImagesState);
  const [brief] = useContext(BriefContext);
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    const getTags = async () => {
      setTags(await TagsService.getTags());
    };
    getTags();
  }, []);

  const handleFinishModal = () => {
    setIsModalVisible(false);
  };

  const generateImages = async (data: FormValues) => {
    if (briefImages.length >= MAX_AI_IMAGES) return;

    const images = await OpenaiService.GenerateImage(data.prompt, 4, '256x256');
    const newImages = images.map((el) => ({ path: el.url }));

    for (const image of newImages)
      await BriefImageService.create(brief.id, image);

    setBriefImages([...briefImages, ...newImages]);

    await BriefService.update(brief.id, { lastAction: 11 });
  };

  return (
    <BriefStep
      stepsLeftText='Осталось 2 шага'
      imageSource='/steps/step11.png'
      imageClassName='-top-[10rem] -right-[14.5rem] h-auto w-auto'
      nextForm='step-11'
      description='*Чем точнее будет запрос, тем качественне будет результат'
    >
      <form
        id='step-11'
        onSubmit={handleSubmit(generateImages)}
        className='flex h-full flex-row gap-x-4'
      >
        <Input
          onClick={() => setIsModalVisible(true)}
          title='Введите запрос для генерации логотипа от нейросети.'
          inputClassName='font-medium'
          {...register('prompt', {
            required: true,
          })}
        />
        <Modal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        >
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
              autoFocus
              {...register('prompt', {
                required: true,
              })}
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

            {selectedBriefImages.length === 4 ? (
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
                  : 'Максимум 8 изображений'}
              </Button>
            )}
          </div>
        </Modal>
      </form>
    </BriefStep>
  );
}
