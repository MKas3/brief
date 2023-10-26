import { authInstance } from '@/services/index';
import { API_BRIEF_IMAGE_ROUTE } from '@/utils/consts';

class BriefImageService {
  create = async (briefId: number, briefImageData: IBriefImage) => {
    const { data } = await authInstance.post<IBriefImage>(
      API_BRIEF_IMAGE_ROUTE + `/${briefId}`,
      briefImageData,
    );
    if (!data) throw new Error();
    return data;
  };

  findAll = async (briefId: number) => {
    const { data } = await authInstance.get<IBriefImage[]>(
      API_BRIEF_IMAGE_ROUTE + `/brief/${briefId}`,
    );
    if (!data) throw new Error();
    return data;
  };

  remove = async (briefImageId: number) => {
    const { data } = await authInstance.delete<IBriefImage>(
      API_BRIEF_IMAGE_ROUTE + `/${briefImageId}`,
    );
    if (!data) throw new Error();
    return data;
  };
}

export default new BriefImageService();
