import { HOME_ROUTE } from '@/utils/consts';
import Image from 'next/image';
import { HeaderLink } from '@/components/Header/HeaderLink';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { Variants, motion } from 'framer-motion';

type HeaderLogoProps = {
  visible?: boolean;
};

const logo: Variants = {
  hidden: {
    width: '0%',
    scale: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 40,
    },
  },
  visible: {
    width: '100%',
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 40,
    },
  },
};

export default function HeaderLogo({ visible }: HeaderLogoProps) {
  const logoRef = useRef<HTMLImageElement>(null);

  return (
    <HeaderLink
      className='flex max-w-[11rem] items-center gap-x-1.5 text-xl font-semibold'
      href={HOME_ROUTE}
    >
      <motion.div variants={logo} animate={visible ? 'visible' : 'hidden'}>
        <Image
          src='/logo.svg'
          ref={logoRef}
          alt='Logo'
          width={54}
          height={30}
        />
      </motion.div>
      BriefMe
    </HeaderLink>
  );
}
