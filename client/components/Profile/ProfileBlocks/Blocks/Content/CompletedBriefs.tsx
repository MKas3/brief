import BriefsContainer from '@/components/Profile/BriefsContainer/BriefsContainer';
import { Progress } from "@/types/progress.types";
import { IResponseBrief } from "@/types/brief.types";

type CompletedBriefsProps = {
  briefs: IResponseBrief[];
  onClick?: () => void;
};

export const CompletedBriefs = ({ briefs, onClick }: CompletedBriefsProps) => {
  return (
    <BriefsContainer
      buttonTitle='Утвердить'
      briefs={briefs.filter((el) => el.completed && el.progress === Progress.PENDING)}
      onClick={onClick}
    />
  );
};
