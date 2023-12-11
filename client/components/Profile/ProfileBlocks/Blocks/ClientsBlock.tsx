import { useRecoilState } from 'recoil';
import { briefsState } from '@/store/brief.recoil';
import BriefsContainerWrapper from '@/components/Profile/BriefsContainer/BriefsContainerWrapper';
import { CompletedBriefs } from '@/components/Profile/ProfileBlocks/Blocks/Content/CompletedBriefs';
import { UncompletedBriefs } from '@/components/Profile/ProfileBlocks/Blocks/Content/UncompletedBriefs';
import { Clients } from '@/components/Profile/ProfileBlocks/Blocks/Content/Clients';
import { ProfileBlockWrapper } from './ProfileBlockWrapper';
import BriefService from "@/services/brief.service";
import { IResponseBrief } from "@/types/brief.types";

type ClientsBlockProps = {
  addClient: () => void;
  onCompletedClick?: (brief?: IResponseBrief) => void;
  onUncompletedClick?: (brief?: IResponseBrief) => void;
};

export const ClientsBlock = ({ addClient, onCompletedClick, onUncompletedClick }: ClientsBlockProps) => {
  const [briefs] = useRecoilState(briefsState);

  return (
    <ProfileBlockWrapper>
      <BriefsContainerWrapper className='row-span-2' title='Заказчики'>
        <Clients addClient={addClient} briefs={briefs} maxClients={6} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Выполненные брифы'>
        <CompletedBriefs briefs={briefs} onClick={onCompletedClick} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Незавершенные брифы'>
        <UncompletedBriefs briefs={briefs} onClick={onUncompletedClick} />
      </BriefsContainerWrapper>
    </ProfileBlockWrapper>
  );
};
