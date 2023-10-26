import { atom } from 'recoil';

export const userState = atom<IResponseUserData | null>({
  key: 'user',
  default: null,
});
