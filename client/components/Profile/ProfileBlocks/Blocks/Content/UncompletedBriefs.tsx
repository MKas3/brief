import BriefsContainer from '@/components/Profile/BriefsContainer/BriefsContainer';
import { IResponseBrief } from '@/types/brief.types';

type UncompletedBriefsProps = {
  briefs: IResponseBrief[];
  onClick?: (brief?: IResponseBrief) => void;
};

export const UncompletedBriefs = ({
  briefs,
  onClick,
}: UncompletedBriefsProps) => {
  return (
    <BriefsContainer
      buttonTitle='Редактировать'
      briefs={briefs
        .filter((el) => !el.completed)
        .toSorted((el1, el2) =>
          el1.incorrectMessage
            ? el2.incorrectMessage
              ? 0
              : -1
            : el2.incorrectMessage
              ? 1
              : 0,
        )}
      onClick={onClick}
    />
  );
};
