import { atom } from 'recoil';

export const briefsState = atom<IResponseBrief[]>({
  key: 'briefs',
  default: [],
});

export const currentBriefState = atom<IResponseBrief | undefined>({
  key: 'currentBrief',
  default: undefined,
});
