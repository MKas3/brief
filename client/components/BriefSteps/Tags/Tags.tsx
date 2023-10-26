import Tag from '@/components/BriefSteps/Tags/Tag';
import { useMemo, useState } from 'react';

type TagsProps = {
  tags: string[];
};

export default function Tags({ tags }: TagsProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const inactiveTags = useMemo(
    () => tags.filter((el) => !activeTags.includes(el)),
    [activeTags, tags],
  );

  const handleTagClick = (element: string) => {
    if (activeTags.includes(element))
      return setActiveTags(activeTags.filter((el) => el !== element));
    setActiveTags([...activeTags, element]);
  };

  return (
    <div className='scrollbar overflow-y-auto rounded-3xl border-2 border-zinc-300 px-3 py-2'>
      <div className='flex flex-row flex-wrap gap-2'>
        {activeTags.map((el, index) => (
          <Tag key={index} isActive={true} onClick={() => handleTagClick(el)}>
            {el}
          </Tag>
        ))}
        {inactiveTags.map((el, index) => (
          <Tag key={index} isActive={false} onClick={() => handleTagClick(el)}>
            {el}
          </Tag>
        ))}
      </div>
    </div>
  );
}
