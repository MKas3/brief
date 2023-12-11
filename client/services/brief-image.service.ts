import { instance } from '@/services/index';
import { API_BRIEF_IMAGE_ROUTE } from '@/utils/consts';
import DefaultQueryService from '@/services/default-query.service';

class BriefImageService extends DefaultQueryService {
  create = async (link: string, briefImageData: IBriefImage) => {
    const { data } = await instance.post<IBriefImage>(
      API_BRIEF_IMAGE_ROUTE + `?brief=${link}`,
      briefImageData,
    );
    if (!data) throw new Error();
    return data;
  };

  useFindAll = (link: string) =>
    this.useServiceQuery(
      ['images', link],
      API_BRIEF_IMAGE_ROUTE + `/brief?brief=${link}`,
      'get',
    );
}

export default new BriefImageService();
