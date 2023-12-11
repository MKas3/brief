import { API_TAGS_ROUTE } from '@/utils/consts';
import axios from 'axios';
import { ITag } from '@/types/tag.types';

class TagsService {
  async getTags(): Promise<ITag[]> {
    const {
      data: { tags },
    } = await axios.get(API_TAGS_ROUTE);
    if (!tags) throw new Error();
    return tags;
  }
}

export default new TagsService();
