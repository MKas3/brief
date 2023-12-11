import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { authInstance, instance } from '@/services/index';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

type QueryServiceMethod = keyof Omit<
  AxiosInstance,
  'interceptors' | 'defaults'
>;

type QueryServiceOptions<TRes> = UseQueryOptions<
  string | AxiosResponse<TRes, any> | undefined,
  AxiosError,
  any
>;

export default abstract class DefaultQueryService {
  defaultOptions: QueryServiceOptions<any> | undefined;

  useServiceQuery = <TRes = any, TData = any>(
    queryKey: QueryKey,
    url: string,
    method: QueryServiceMethod,
    data?: TData,
    options: QueryServiceOptions<TRes> | undefined = this.defaultOptions,
    auth: boolean = false,
  ) => {
    return useQuery<
      string | AxiosResponse<TRes, any> | undefined | any,
      AxiosError,
      TData
    >(
      queryKey,
      async () => {
        try {
          return await (auth ? authInstance : instance)[method]<TRes>(
            url,
            data,
          );
        } catch {}
      },
      options,
    );
  };

  useAuthServiceQuery = <TRes = any, TData = any>(
    queryKey: QueryKey,
    url: string,
    method: QueryServiceMethod,
    data?: TData,
    options: QueryServiceOptions<TRes> | undefined = this.defaultOptions,
  ) => {
    return this.useServiceQuery<TRes, TData>(
      queryKey,
      url,
      method,
      data,
      options,
      true,
    );
  };
}
