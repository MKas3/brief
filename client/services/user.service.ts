import { authInstance } from '@/services/index';
import {
  API_BRIEF_ROUTE,
  API_REGISTRATION_ROUTE,
  BRIEFS_ROUTE,
} from '@/utils/consts';
import { IClient } from '@/types/brief.types';

class UserService {
  findAll = async (skip: number, take: number) => {
    const { data } = await authInstance.get<IResponseUserData[]>(
      `user?skip=${skip}&take=${take}`,
    );

    if (!data) throw new Error();

    return data;
  };

  find = async (id: number) => {
    const { data } = await authInstance.get<IResponseUserData>(`user/${id}`);

    if (!data) throw new Error();

    return data;
  };

  setFAQViewed = () => {
    localStorage.setItem('faqViewed', 'true');
  };

  checkFAQViewed = () => {
    return localStorage.getItem('faqViewed') === 'true';
  };

  update = async (userData: IUpdateUserData) => {
    const { data } = await authInstance.patch<IResponseUserData>(
      API_REGISTRATION_ROUTE,
      userData,
    );
    if (!data) throw new Error();
    localStorage.setItem('token', data.token);
    return data;
  };

  findAllClient = async () => {
    const { data } = await authInstance.get<IClient[]>(
      API_BRIEF_ROUTE + '/clients',
    );
    if (!data) throw new Error();
    return data;
  };

  delete = async (id: string) => {
    const { data } = await authInstance.delete(API_REGISTRATION_ROUTE + `/${id}`);
    if (!data) throw new Error();
    return data;
  };
}

export default new UserService();
