import { Price } from '@/types/price.types';

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
