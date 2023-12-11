import { atom } from 'recoil';
import { IRequestBrief, IResponseBrief } from "@/types/brief.types";

export const briefsState = atom<IResponseBrief[]>({
  key: 'briefs',
  default: [],
});

export const currentBriefState = atom<IResponseBrief | undefined>({
  key: 'currentBrief',
  default: undefined,
});

export const generatedBriefLinkState = atom<string>({
  key: 'generatedBriefLink',
  default: '',
});

export const briefLinkState = atom<string>({
  key: 'briefLink',
  default: '',
});

export const newBriefState = atom<IRequestBrief>({
  key: 'newBrief',
  default: {} as IRequestBrief,
});

export const needUpdateBriefsState = atom<boolean>({
  key: 'needUpdateBrief',
  default: true,
})

export const nextBriefEditingPageState = atom<number | undefined>({
  key: 'nextBriefEditingPage',
  default: undefined,
})