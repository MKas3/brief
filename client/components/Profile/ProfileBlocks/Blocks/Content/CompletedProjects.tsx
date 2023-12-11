import BriefsContainer from '@/components/Profile/BriefsContainer/BriefsContainer';
import { Progress } from "@/types/progress.types";
import { IResponseBrief } from "@/types/brief.types";

type CompletedProjectsProps = {
  briefs: IResponseBrief[];
  onClick?: (brief?: IResponseBrief) => void;
};

export const CompletedProjects = ({ briefs, onClick }: CompletedProjectsProps) => {
  return (
    <BriefsContainer
      buttonTitle='Смотреть'
      briefs={briefs.filter((el) => el.progress === Progress.DONE)}
      onClick={onClick}
    />
  );
};
