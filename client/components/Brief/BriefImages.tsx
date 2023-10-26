'use client';

import { useRecoilState } from 'recoil';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  briefImagesState,
  briefLoadingState,
  selectedBriefImagesState,
} from '@/store/brief-images.recoil';
import Loading from '@/app/loading';

type BriefImagesProps = {
  className?: string;
};

export default function BriefImages({ className }: BriefImagesProps) {
  const [briefImages, setBriefImages] = useRecoilState(briefImagesState);
  const [selectedBriefImages, setSelectedBriefImages] = useRecoilState(
    selectedBriefImagesState,
  );
  const [canSelect, setCanSelect] = useState(true);
  const [briefLoading, setBriefLoading] = useRecoilState(briefLoadingState);

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
    setCanSelect(selectedBriefImages.length < 4);
  }, [selectedBriefImages]);

  return (
    <div
      className={
        (className ? `${className} ` : '') +
        'grid grid-cols-2 gap-x-2 gap-y-2 px-2'
      }
    >
      {briefLoading ? (
        <Loading />
      ) : (
        briefImages.map((image, index) => (
          <Image
            className={
              (selectedBriefImages.some((el) => el === image)
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
