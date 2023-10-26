import { authInstance, instance } from '@/services/index';
import {
  API_AUTH_ROUTE,
  API_LOGIN_ROUTE,
  API_REGISTRATION_ROUTE,
} from '@/utils/consts';

class AuthService {
  register = async (userData: IRequestUserData) => {
    const { data } = await instance.post<IResponseUserData>(
      API_REGISTRATION_ROUTE,
      userData,
    );
    if (!data) throw new Error();
    localStorage.setItem('token', data.token);
    return data;
  };

  registerByGoogle = async (userData: IRequestGoogleUserData) => {
    const { data } = await instance.post(
      API_REGISTRATION_ROUTE + '/google',
      userData,
    );
    if (!data) throw new Error();
    localStorage.setItem('token', data.token);
    return data;
  };

  login = async (userData: IRequestUserData) => {
    const { data } = await instance.post<IResponseUserData>(
      API_LOGIN_ROUTE,
      userData,
    );
    if (!data) throw new Error();
    localStorage.setItem('token', data.token);
    return data;
  };

  loginByGoogle = async (userData: IRequestGoogleUserData) => {
    const { data } = await instance.post<IResponseUserData>(
      API_LOGIN_ROUTE + '/google',
      userData,
    );
    if (!data) throw new Error();
    localStorage.setItem('token', data.token);
    return data;
  };

  auth = async () => {
    const { data } = await authInstance.get<IResponseUserData>(API_AUTH_ROUTE);
    if (!data) return null;
    localStorage.setItem('token', data.token);
    return data;
  };

  logout = () => {
    localStorage.removeItem('token');
  };
}

export default new AuthService();
