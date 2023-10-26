import { useRouter } from 'next/navigation';
import { BRIEFS_ROUTE } from '@/utils/consts';
import { Button } from '@/components/Button';

type BriefCardProps = {
  brief: IResponseBrief;
};

export default function BriefCard({ brief }: BriefCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(BRIEFS_ROUTE + `/${brief.id}/${brief.lastAction ?? 'steps'}`);
  };

  return (
    <Button onClick={handleClick} isAlt>
      <h1 className='text-lg font-semibold'>{brief.title || 'Нет названия'}</h1>
    </Button>
  );
}
