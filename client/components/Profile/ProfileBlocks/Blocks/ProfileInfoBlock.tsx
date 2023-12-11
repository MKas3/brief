import { useRecoilState } from 'recoil';
import { briefsState } from '@/store/brief.recoil';
import BriefsContainerWrapper from '@/components/Profile/BriefsContainer/BriefsContainerWrapper';
import { CompletedBriefs } from '@/components/Profile/ProfileBlocks/Blocks/Content/CompletedBriefs';
import { ProfileInfo } from '@/components/Profile/ProfileBlocks/Blocks/Content/ProfileInfo';
import { userState } from '@/store/user.recoil';
import { ProfileBlockWrapper } from './ProfileBlockWrapper';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { Statistic } from '@/components/Profile/ProfileBlocks/Blocks/Content/Statistic';
import { IResponseBrief } from "@/types/brief.types";

type ProfileInfoBlockProps = {
  onCompletedBrief?: (brief?: IResponseBrief) => void;
}

export const ProfileInfoBlock = ({ onCompletedBrief }: ProfileInfoBlockProps) => {
  const [user, setUser] = useRecoilState(userState);
  const [briefs] = useRecoilState(briefsState);
  const router = useRouter();

  if (!user) {
    return <Loading />;
  }

  return (
    <ProfileBlockWrapper>
      <BriefsContainerWrapper className='row-span-2' title='Данные профиля'>
        <ProfileInfo user={user} setUser={setUser} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Статистика по заказам'>
        <Statistic briefs={briefs} />
      </BriefsContainerWrapper>
      <BriefsContainerWrapper title='Выполненные брифы'>
        <CompletedBriefs briefs={briefs} onClick={onCompletedBrief} />
      </BriefsContainerWrapper>
    </ProfileBlockWrapper>
  );
};
