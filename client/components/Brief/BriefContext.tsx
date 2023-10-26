import { createContext, Dispatch, SetStateAction } from 'react';

export const BriefContext = createContext<
  [IResponseBrief, Dispatch<SetStateAction<IResponseBrief>>]
>([{} as IResponseBrief, () => {}]);
