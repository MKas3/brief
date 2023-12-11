import { createContext, Dispatch, SetStateAction } from 'react';
import { IRequestBrief } from "@/types/brief.types";

export const BriefContext = createContext<
  [IRequestBrief, Dispatch<SetStateAction<IRequestBrief>>]
>([{} as IRequestBrief, () => {}]);
