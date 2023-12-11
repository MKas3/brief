import { useRecoilState } from 'recoil';
import { briefsState } from '@/store/brief.recoil';
import BriefsContainerWrapper from '@/components/Profile/BriefsContainer/BriefsContainerWrapper';
import { CompletedBriefs } from '@/components/Profile/ProfileBlocks/Blocks/Content/CompletedBriefs';
import { UncompletedBriefs } from '@/components/Profile/ProfileBlocks/Blocks/Content/UncompletedBriefs';
import { Clients } from '@/components/Profile/ProfileBlocks/Blocks/Content/Clients';
import { CompletedProjects } from '@/components/Profile/ProfileBlocks/Blocks/Content/CompletedProjects';
import { ProfileBlockWrapper } from '@/components/Profile/ProfileBlocks/Blocks/ProfileBlockWrapper';
import { IResponseBrief } from "@/types/brief.types";

type ProjectsBlockProps = {
  addClient: () => void;
  onCompletedClick?: (brief?: IResponseBrief) => void;
  onUncompletedClick?: (brief?: IResponseBrief) => void;
  onCompletedProjectsClick?: (brief?: IResponseBrief) => void;
};

export const ProjectsBlock = ({
  addClient,
  onCompletedClick,
  onUncompletedClick,
  onCompletedProjectsClick,
}: ProjectsBlockProps) => {
  const [briefs] = useRecoilState(briefsState);

  return (
    <ProfileBlockWrapper>
      <BriefsContainerWrapper title='Выполненные брифы'>
        <CompletedBriefs briefs={briefs} onClick={onCompletedClick} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Заказчики'>
        <Clients addClient={addClient} briefs={briefs} maxClients={3} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Незавершенные брифы'>
        <UncompletedBriefs briefs={briefs} onClick={onUncompletedClick} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Выполненные проекты'>
        <CompletedProjects briefs={briefs} onClick={onCompletedProjectsClick} />
      </BriefsContainerWrapper>
    </ProfileBlockWrapper>
  );
};
