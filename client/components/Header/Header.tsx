'use client';

import { HeaderLink } from '@/components/Header/HeaderLink';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/user.recoil';
import { ProfileButton } from '@/components/Header/ProfileButton';
import {
  ABOUT_SECTION_ROUTE,
  BRIEFS_ROUTE,
  CONTACTS_SECTION_ROUTE,
  HOME_ROUTE,
  HOME_SECTION_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from '@/utils/consts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { usePathname, useRouter } from 'next/navigation';
import HeaderLogo from '@/components/Header/HeaderLogo';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from 'framer-motion';
import { BurgerButton } from '@/components/Header/BurgerButton';

const header: Variants = {
  normal: {
    backgroundColor: 'rgb(0 0 0 / 0)',
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
  alt: {
    backgroundColor: 'rgb(23 23 23)',
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
};

export function Header() {
  const [user, setUser] = useRecoilState(userState);
  const [isHeaderAlt, setIsHeaderAlt] = useState(false);
  const pathname = usePathname();
  const isHomePage = useMemo(() => pathname === HOME_ROUTE, [pathname]);
  const isAuthPage = useMemo(
    () => pathname === LOGIN_ROUTE || pathname === REGISTRATION_ROUTE,
    [pathname],
  );
  const isProfilePage = useMemo(() => pathname === PROFILE_ROUTE, [pathname]);
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (isHomePage) setIsHeaderAlt(progress > 0.1);
  });

  useEffect(() => {
    setIsHeaderAlt(!isAuthPage && !isHomePage);
  }, [pathname, isAuthPage, isHomePage]);

  return (
    <motion.header
      className={
        (isHomePage
          ? 'py-3 '
          : !isAuthPage
          ? 'bg-neutral-900 py-4  '
          : 'py-4 ') +
        'fixed top-0 z-30 flex w-full max-w-[100vw] justify-between px-[10vw] transition-all duration-300'
      }
      variants={header}
      animate={isHeaderAlt ? 'alt' : 'normal'}
    >
      <HeaderLogo visible={isHomePage || isAuthPage} />
      <div className='flex items-center gap-x-8 sm:gap-x-0'>
        {isHomePage && (
          <div className='flex items-center gap-x-8 sm:hidden'>
            <HeaderLink isSectionLink={isHomePage} href={HOME_SECTION_ROUTE}>
              Главная
            </HeaderLink>
            <HeaderLink isSectionLink={true} href={ABOUT_SECTION_ROUTE}>
              О сервисе
            </HeaderLink>
            <HeaderLink isSectionLink={true} href={CONTACTS_SECTION_ROUTE}>
              Контакты
            </HeaderLink>
          </div>
        )}
        {!isAuthPage &&
          (user ? (
            <ProfileButton open={open} setOpen={setOpen} />
          ) : (
            <div className='flex rounded-full border-2 border-zinc-300 text-sm'>
              <HeaderLink
                href={LOGIN_ROUTE}
                className='rounded-full py-[0.4rem] pl-3 pr-2 transition hover:text-zinc-300'
              >
                Вход
              </HeaderLink>
              <HeaderLink
                href={REGISTRATION_ROUTE}
                className='rounded-full bg-zinc-300 px-3 py-[0.4rem] text-black transition hover:bg-zinc-100'
              >
                Регистрация
              </HeaderLink>
            </div>
          ))}
        {isHomePage && <BurgerButton onClick={() => setOpen(!open)} />}
      </div>
    </motion.header>
  );
}
