import { authInstance } from '@/services/index';
import { API_BRIEF_ROUTE } from '@/utils/consts';

class BriefService {
  create = async (briefData: IRequestBrief) => {
    const { data } = await authInstance.post<IResponseBrief>(
      API_BRIEF_ROUTE,
      briefData,
    );
    if (!data) throw new Error();
    return data;
  };
  update = async (briefId: number, briefData: IRequestBrief) => {
    const { data } = await authInstance.patch<IResponseBrief>(
      API_BRIEF_ROUTE + `/${briefId}`,
      briefData,
    );
    if (!data) throw new Error();
    return data;
  };
  remove = async (briefId: number) => {
    const { data } = await authInstance.delete<IResponseBrief>(
      API_BRIEF_ROUTE + `/${briefId}`,
    );
    if (!data) throw new Error();
    return data;
  };
  findOne = async (briefId: number) => {
    const { data } = await authInstance.get<IResponseBrief>(
      API_BRIEF_ROUTE + `/${briefId}`,
    );
    if (!data) throw new Error();
    return data;
  };

  findAll = async (take: number, skip: number) => {
    const { data } = await authInstance.get<IResponseBrief[]>(API_BRIEF_ROUTE, {
      params: {
        take,
        skip,
      },
    });
    if (!data) throw new Error();
    return data;
  };
}

export default new BriefService();
