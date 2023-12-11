'use client';

import { useRecoilState } from 'recoil';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import {
  briefImagesState,
  briefLoadingState,
  selectedBriefImagesState,
} from '@/store/brief-images.recoil';
import Loading from '@/app/loading';
import BriefImageService from '@/services/brief-image.service';
import { BriefContext } from '@/components/Brief/BriefContext';
import BriefService from '@/services/brief.service';
import { briefLinkState } from '@/store/brief.recoil';

export default function BriefImages() {
  const [brief] = useContext(BriefContext);
  const [briefImages, setBriefImages] = useRecoilState(briefImagesState);
  const [selectedBriefImages, setSelectedBriefImages] = useRecoilState(
    selectedBriefImagesState,
  );
  const [canSelect, setCanSelect] = useState(true);
  const [briefLoading, setBriefLoading] = useRecoilState(briefLoadingState);
  const [link] = useRecoilState(briefLinkState);
  const { refetch: refetchImages, isFetched: imagesFetched } =
    BriefImageService.useFindAll(link);
  const { refetch: refetchUpdateImages } = BriefService.useUpdateImages(
    link,
    selectedBriefImages,
  );

  const handleClickImage = (path: string, index: number) => {
    if (selectedBriefImages.some((el) => el.path === path)) {
      setSelectedBriefImages(
        selectedBriefImages.filter((el) => el.path !== path),
      );
    } else {
      if (selectedBriefImages.length >= 4) return;
      setSelectedBriefImages([...selectedBriefImages, { path }]);
    }
  };

  useEffect(() => {
    const findBriefImages = async () => {
      await refetchImages().then((res) => {
        const images: IBriefImage[] = res.data.data ?? [];
        setBriefImages(images);
        setSelectedBriefImages(images.filter((el) => el.briefSelectedId));
      });
    };

    findBriefImages();
  }, []);

  useEffect(() => {
    setCanSelect(selectedBriefImages.length < 4);
    if (selectedBriefImages && selectedBriefImages.length > 0)
      refetchUpdateImages();
  }, [
    selectedBriefImages,
    brief.id,
    refetchUpdateImages,
    imagesFetched,
    setCanSelect,
  ]);

  return (
    <div className='grid grid-cols-2 gap-x-2 gap-y-2 px-2'>
      {briefLoading ? (
          Array.from({ length: 4 }).map((el, index) => (
            <div key={index} className='rounded border-2 border-zinc-300 h-64 w-64 overflow-hidden'>
              <Loading />
            </div>
          ))
      ) : (
        briefImages.map((image, index) => (
          <Image
            className={
              (selectedBriefImages.some((el) => el.path === image.path)
                ? 'scale-95 border-zinc-500 hover:border-zinc-600 '
                : canSelect
                ? 'border-zinc-300 hover:border-zinc-400 '
                : 'border-zinc-200 opacity-50 ') +
              'rounded border-2 p-2 transition'
            }
            key={index}
            src={image.path}
            alt='AI Image'
            width={256}
            height={256}
            onClick={() => handleClickImage(image.path, index)}
          />
        ))
      )}
    </div>
  );
}
