import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import { Variants, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { HeaderLink } from '@/components/Header/HeaderLink';
import {
  ABOUT_SECTION_ROUTE,
  CONTACTS_SECTION_ROUTE,
  HOME_ROUTE,
  HOME_SECTION_ROUTE,
} from '@/utils/consts';

const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
};

const wrapper: Variants = {
  visible: {
    pointerEvents: 'auto',
  },
  invisible: {
    pointerEvents: 'none',
  },
};

const backdrop: Variants = {
  visible: {
    opacity: 1,
    transition,
  },
  invisible: {
    opacity: 0,
    transition,
  },
};

const menu: Variants = {
  visible: {
    x: 0,
    transition,
  },
  invisible: {
    x: '100%',
    transition,
  },
};

export const BurgerButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        className='invisible fixed inset-0 md:visible'
        variants={wrapper}
        animate={isOpen ? 'visible' : 'invisible'}
      >
        <motion.div
          className='h-full w-full bg-black/30'
          variants={backdrop}
          onClick={toggleMenu}
        />
        <motion.div
          className='fixed bottom-0 right-0 top-0 w-96 max-w-full bg-neutral-900 px-12 py-[15vh]'
          variants={menu}
        >
          <button
            type='button'
            className='absolute right-6 top-6'
            onClick={toggleMenu}
          >
            <IoClose className='h-8 w-8' />
          </button>
          <div className='flex flex-col gap-y-10'>
            <HeaderLink
              isSectionLink
              className='text-2xl'
              href={HOME_SECTION_ROUTE}
              onClick={toggleMenu}
            >
              Главная
            </HeaderLink>
            <HeaderLink
              isSectionLink
              className='text-2xl'
              href={ABOUT_SECTION_ROUTE}
              onClick={toggleMenu}
            >
              О сервисе
            </HeaderLink>
            <HeaderLink
              isSectionLink
              className='text-2xl'
              href={CONTACTS_SECTION_ROUTE}
              onClick={toggleMenu}
            >
              Контакты
            </HeaderLink>
          </div>
        </motion.div>
      </motion.div>
      <button
        type='button'
        className='invisible ml-4 p-1 md:visible min-w-fit'
        onClickCapture={toggleMenu}
        {...props}
      >
        <Image src='/burger.svg' alt='Burger' width={24} height={24} />
      </button>
    </>
  );
};
