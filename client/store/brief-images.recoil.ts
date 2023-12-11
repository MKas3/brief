import { atom } from 'recoil';
import { ITag } from '@/types/tag.types';

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

export const activeTagsState = atom<ITag[]>({
  key: 'activeTags',
  default: [],
});

export const requiredTagsState = atom<ITag[]>({
  key: 'requiredTags',
  default: [],
});
