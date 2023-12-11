import { useRecoilState } from 'recoil';
import { briefsState } from '@/store/brief.recoil';
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { MainProfileBlock } from '@/components/Profile/ProfileBlocks/Blocks/MainProfileBlock';
import { ProjectsBlock } from '@/components/Profile/ProfileBlocks/Blocks/ProjectsBlock';
import { ClientsBlock } from '@/components/Profile/ProfileBlocks/Blocks/ClientsBlock';
import { ProfileInfoBlock } from '@/components/Profile/ProfileBlocks/Blocks/ProfileInfoBlock';
import { ProfileBlock } from "@/components/Profile/ProfileBlocks/Blocks/ProfileBlockWrapper";
import { useEffect, useState } from "react";

type ProfileBlocksProps = ProfileBlock & {
  currentPage: number;
  onClickAddClient: () => void;
  onCompletedClick: () => void;
  onUncompletedClick: () => void;
  onInWorkClick: () => void;
  onCompletedProjectsClick: () => void;
};

const container: Variants = {
    animate: (y) => ({
      y,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      },
    }),
  };

export default function ProfileBlocks({
  currentPage,
  onClickAddClient,
  onCompletedClick,
  onUncompletedClick,
  onInWorkClick,
  onCompletedProjectsClick,
}: ProfileBlocksProps) {
  const [briefs] = useRecoilState(briefsState);
  const [blockHeight, setBlockHeight] = useState(0);

  const addClient = () => {
    onClickAddClient();
  };

  return (
    <motion.div style={{ height: blockHeight }} className='overflow-hidden' layout='position'>
      <motion.div
        className='grid grid-rows-5'
        variants={container}
        animate='animate'
        custom={-blockHeight * currentPage}
      >
        <MainProfileBlock
          onChangeHeight={setBlockHeight}
          onCompletedClick={onCompletedClick}
          onInWorkClick={onInWorkClick}
          onUncompletedClick={onUncompletedClick}
        />
        <ClientsBlock
          addClient={addClient}
          onCompletedClick={onCompletedClick}
          onUncompletedClick={onUncompletedClick}
        />
        <ProjectsBlock
          addClient={addClient}
          onCompletedClick={onCompletedClick}
          onUncompletedClick={onUncompletedClick}
          onCompletedProjectsClick={onCompletedProjectsClick}
        />
        <ProfileInfoBlock onCompletedBrief={onCompletedClick} />
      </motion.div>
    </motion.div>
  );
}
