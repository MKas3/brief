import BriefsContainerWrapper from '@/components/Profile/BriefsContainer/BriefsContainerWrapper';
import { CompletedBriefs } from '@/components/Profile/ProfileBlocks/Blocks/Content/CompletedBriefs';
import { useRecoilState } from 'recoil';
import { briefsState } from '@/store/brief.recoil';
import { InWorkBriefs } from '@/components/Profile/ProfileBlocks/Blocks/Content/InWorkBriefs';
import { UncompletedBriefs } from '@/components/Profile/ProfileBlocks/Blocks/Content/UncompletedBriefs';
import ProfileCalendar from '@/components/Profile/Calendar/Calendar';
import {
  ProfileBlock,
  ProfileBlockWrapper,
} from '@/components/Profile/ProfileBlocks/Blocks/ProfileBlockWrapper';
import { IResponseBrief } from "@/types/brief.types";
import { useEffect } from "react";

type MainProfileBlock = ProfileBlock & {
  onCompletedClick?: (brief?: IResponseBrief) => void;
  onInWorkClick?: (brief?: IResponseBrief) => void;
  onUncompletedClick?: (brief?: IResponseBrief) => void;
};

export const MainProfileBlock = ({
  onChangeHeight,
  onCompletedClick,
  onInWorkClick,
  onUncompletedClick,
}: MainProfileBlock) => {
  const [briefs] = useRecoilState(briefsState);

  return (
    <ProfileBlockWrapper onChangeHeight={onChangeHeight}>
      <BriefsContainerWrapper title='Выполненные брифы'>
        <CompletedBriefs briefs={briefs} onClick={onCompletedClick} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Проекты в работе'>
        <InWorkBriefs briefs={briefs} onClick={onInWorkClick} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Незавершенные брифы'>
        <UncompletedBriefs briefs={briefs} onClick={onUncompletedClick} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Календарь'>
        <ProfileCalendar />
      </BriefsContainerWrapper>
    </ProfileBlockWrapper>
  );
};
