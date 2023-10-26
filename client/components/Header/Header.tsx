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
import { FaPlus } from 'react-icons/fa6';

export function Header() {
  const [user, setUser] = useRecoilState(userState);
  const [isHeaderAlt, setIsHeaderAlt] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHomePage = useMemo(() => pathname === HOME_ROUTE, [pathname]);
  const isAuthPage = useMemo(
    () => pathname === LOGIN_ROUTE || pathname === REGISTRATION_ROUTE,
    [pathname],
  );
  const isProfilePage = useMemo(() => pathname === PROFILE_ROUTE, [pathname]);
  const router = useRouter();

  const handleScroll = () => {
    if (!isHomePage && !isAuthPage) return;
    const currentScrollPos = window.scrollY;
    setIsHeaderAlt(currentScrollPos > 100);
  };

  useEffect(() => {
    addEventListener('scroll', handleScroll);
    return () => removeEventListener('scroll', handleScroll);
  });

  return (
    <CSSTransition
      timeout={150}
      in={isHeaderAlt}
      nodeRef={headerRef}
      classNames={{
        enter: 'bg-opacity-0',
        enterDone: 'bg-neutral-900 bg-opacity-100',
        exit: 'bg-opacity-100',
        exitDone: 'bg-opacity-0',
      }}
    >
      <header
        className={
          (isHomePage ? 'py-1 ' : !isAuthPage ? 'bg-neutral-900 py-2 ' : '') +
          'fixed top-0 z-30 flex w-full justify-between px-44 transition-all duration-300'
        }
        ref={headerRef}
      >
        <HeaderLogo visible={isHomePage || isAuthPage} />
        <div className='flex items-center space-x-8 max-lg:hidden'>
          {!isAuthPage && !isProfilePage && (
            <>
              <HeaderLink
                isSectionLink={isHomePage}
                href={isHomePage ? HOME_SECTION_ROUTE : HOME_ROUTE}
              >
                Главная
              </HeaderLink>
              <HeaderLink isSectionLink={true} href={ABOUT_SECTION_ROUTE}>
                О сервисе
              </HeaderLink>
              <HeaderLink isSectionLink={true} href={CONTACTS_SECTION_ROUTE}>
                Контакты
              </HeaderLink>
              <HeaderLink href={BRIEFS_ROUTE}>FAQ</HeaderLink>
            </>
          )}
          {isProfilePage && (
            <button
              type='button'
              className='flex items-center gap-x-2 rounded-full border border-white px-3 py-1 text-xs font-medium transition hover:bg-white/5'
              onClick={() => router.push(BRIEFS_ROUTE)}
            >
              <FaPlus />
              Создать
            </button>
          )}
          {!isAuthPage &&
            (user ? (
              <ProfileButton />
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
        </div>
      </header>
    </CSSTransition>
  );
}
