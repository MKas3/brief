import { Price } from '@/types/price.types';
import { Progress } from "@/types/progress.types";

export interface IRequestUpdateOrder {
  price: Price;
  deadline: Date;
}

export interface IRequestOrder extends IRequestUpdateOrder {
  briefId: number;
}

export interface IResponseOrder extends IRequestOrder {
  id: number;
  userId: number;
  progress: Progress;
}
