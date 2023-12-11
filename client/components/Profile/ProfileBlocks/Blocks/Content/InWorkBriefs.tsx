import BriefsContainer from '@/components/Profile/BriefsContainer/BriefsContainer';
import { Progress } from '@/types/progress.types';
import { IResponseBrief } from "@/types/brief.types";

type InWorkBriefsProps = {
  briefs: IResponseBrief[];
  onClick?: (brief?: IResponseBrief) => void;
};

export const InWorkBriefs = ({ briefs, onClick }: InWorkBriefsProps) => {
  return (
    <BriefsContainer
      buttonTitle='Смотреть'
      briefs={briefs.filter((el) => el.progress === Progress.IN_PROGRESS)}
      onClick={onClick}
    />
  );
};
