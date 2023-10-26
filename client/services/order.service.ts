import {
  IRequestOrder,
  IRequestUpdateOrder,
  IResponseOrder,
} from '@/types/order.types';
import { authInstance } from '@/services/index';
import { API_ORDER_ROUTE } from '@/utils/consts';

class OrderService {
  create = async (orderData: IRequestOrder) => {
    const { data } = await authInstance.post<IResponseOrder>(
      API_ORDER_ROUTE,
      orderData,
    );
    if (!data) throw new Error();
    return data;
  };
  update = async (orderId: number, orderData: IRequestUpdateOrder) => {
    const { data } = await authInstance.patch<IResponseOrder>(
      API_ORDER_ROUTE + `/${orderId}`,
      orderData,
    );
    if (!data) throw new Error();
    return data;
  };
  remove = async (orderId: number) => {
    const { data } = await authInstance.delete<IResponseOrder>(
      API_ORDER_ROUTE + `/${orderId}`,
    );
    if (!data) throw new Error();
    return data;
  };
}

export default new OrderService();
