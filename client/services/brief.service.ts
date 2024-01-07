import { authInstance, instance } from '@/services/index';
import { API_BRIEF_ROUTE } from '@/utils/consts';
import DefaultQueryService from '@/services/default-query.service';
import { IRequestBrief, IResponseBrief } from '@/types/brief.types';

class BriefService extends DefaultQueryService {
  constructor() {
    super();
    this.defaultOptions = {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    };
  }

  useGenerateLink = () =>
    this.useAuthServiceQuery<{ link: string }>(
      'link',
      API_BRIEF_ROUTE + '/generateLink',
      'post',
    );

  useFindLastLink = () =>
    this.useAuthServiceQuery<{ link: string }>(
      'lastLink',
      API_BRIEF_ROUTE + '/link/last',
      'get',
    );

  useFindLink = (briefId: number) =>
    this.useAuthServiceQuery<{ link: string }>(
      'link',
      API_BRIEF_ROUTE + `/link/${briefId}`,
      'get',
    );

  useCheckLink = (link: string) =>
    this.useServiceQuery<{
      briefId: number;
    }>(
      ['checkLink', link],
      API_BRIEF_ROUTE + `/checkLink?brief=${link}`,
      'post',
    );

  useUpdate = (link: string, briefData: IRequestBrief) =>
    this.useServiceQuery<IResponseBrief>(
      ['updateBrief', link],
      API_BRIEF_ROUTE + `/link?brief=${link}`,
      'patch',
      briefData,
    );

  useAuthUpdate = (briefId: number, briefData: IRequestBrief) =>
    this.useAuthServiceQuery<IResponseBrief>(
      'updateBrief',
      API_BRIEF_ROUTE + `/${briefId}`,
      'patch',
      briefData,
    );

  useUpdateImages = (link: string, selected: IBriefImage[]) =>
    this.useServiceQuery(
      ['updateImages', link],
      API_BRIEF_ROUTE + `/images?brief=${link}`,
      'patch',
      selected,
    );

  remove = async (briefId: number) => {
    const { data } = await authInstance.delete<IResponseBrief>(
      API_BRIEF_ROUTE + `/${briefId}`,
    );
    if (!data) throw new Error();
    return data;
  };

  removeAdmin = async (briefId: number) => {
    const { data } = await authInstance.delete<IResponseBrief>(
      API_BRIEF_ROUTE + `/admin/${briefId}`,
    );
    if (!data) throw new Error();
    return data;
  }

  findOne = async (briefId: number) => {
    const { data } = await authInstance.get<IResponseBrief>(
      API_BRIEF_ROUTE + `/${briefId}`,
    );
    if (!data) throw new Error();
    return data;
  };

  findOneByLink = async (link: string) => {
    const { data } = await instance.get<IResponseBrief>(
      API_BRIEF_ROUTE + `/link?brief=${link}`,
    );
    if (!data) throw new Error();
    return data;
  };

  findAll = async (
    take: number,
    skip: number,
    where?: Partial<IRequestBrief>,
  ) => {
    const { data } = await authInstance.get<IResponseBrief[]>(API_BRIEF_ROUTE, {
      params: {
        take,
        skip,
        where,
      },
    });
    if (!data) throw new Error();
    return data;
  };

  async findAllByUser(skip: number, take: number, userId: number) {
    const { data } = await authInstance.get<IResponseBrief[]>(
      API_BRIEF_ROUTE + `/user/${userId}?skip=${skip}&take=${take}`,
    );
    if (!data) throw new Error();
    return data;
  }
}

export default new BriefService();
