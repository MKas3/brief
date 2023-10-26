import { atom } from 'recoil';

export const briefLoadingState = atom<boolean>({
  key: 'briefLoading',
  default: false,
});

export const briefImagesState = atom<IBriefImage[]>({
  key: 'briefImages',
  default: [],
});

export const selectedBriefImagesState = atom<IBriefImage[]>({
  key: 'selectedBriefImages',
  default: [],
});
