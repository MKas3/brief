import { createContext, Dispatch, SetStateAction } from 'react';

export const BriefStepContext = createContext<
  [number, Dispatch<SetStateAction<number>>]
>([0, () => {}]);
