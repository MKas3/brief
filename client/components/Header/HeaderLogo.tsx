import { HOME_ROUTE } from '@/utils/consts';
import Image from 'next/image';
import { HeaderLink } from '@/components/Header/HeaderLink';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

type HeaderLogoProps = {
  visible?: boolean;
};

export default function HeaderLogo({ visible }: HeaderLogoProps) {
  const logoRef = useRef<HTMLImageElement>(null);

  return (
    <HeaderLink
      className='flex max-w-[11rem] items-center gap-x-1.5 text-xl font-semibold'
      href={HOME_ROUTE}
    >
      <CSSTransition
        timeout={0}
        in={visible}
        nodeRef={logoRef}
        classNames={{
          enter: 'w-0',
          enterDone: 'w-full',
          exit: 'w-full',
          exitDone: 'w-0',
        }}
      >
        <Image
          src='/logo.svg'
          className={
            (visible ? 'w-full ' : 'w-0 ') + 'transition-all duration-300'
          }
          ref={logoRef}
          alt='Logo'
          width={90}
          height={50}
        />
      </CSSTransition>
      BriefMe
    </HeaderLink>
  );
}
