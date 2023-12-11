import Tag from '@/components/BriefSteps/Tags/Tag';
import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import {
  activeTagsState,
  requiredTagsState,
} from '@/store/brief-images.recoil';
import { ITag } from '@/types/tag.types';

type TagsProps = {
  tags: ITag[];
};

export default function Tags({ tags }: TagsProps) {
  const [activeTags, setActiveTags] = useRecoilState(activeTagsState);
  const [requiredTags, setRequiredTags] = useRecoilState(requiredTagsState);

  const inactiveTags = useMemo(
    () => tags.filter((el) => !activeTags.includes(el) && !el.required),
    [activeTags, tags],
  );

  useEffect(() => {
    setRequiredTags(tags.filter((el) => el.required));
  }, [tags, setRequiredTags]);

  const handleTagClick = (element: ITag) => {
    if (activeTags.includes(element))
      return setActiveTags(activeTags.filter((el) => el !== element));
    setActiveTags([...activeTags, element]);
  };

  return (
    <div className='scrollbar overflow-y-auto rounded-3xl border-2 border-zinc-300 px-3 py-2'>
      <div className='flex flex-row flex-wrap gap-2'>
        {requiredTags.map((el, index) => (
          <Tag
            key={index}
            active={true}
            disabled={true}
            onClick={() => handleTagClick(el)}
          >
            {el.title}
          </Tag>
        ))}
        {activeTags.map((el, index) => (
          <Tag key={index} active={true} onClick={() => handleTagClick(el)}>
            {el.title}
          </Tag>
        ))}
        {inactiveTags.map((el, index) => (
          <Tag key={index} onClick={() => handleTagClick(el)}>
            {el.title}
          </Tag>
        ))}
      </div>
    </div>
  );
}
