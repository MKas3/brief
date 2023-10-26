'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { HoverState } from '@/types/hover-state.types';

type InfoBrickProps = {
  firstTitle?: React.ReactNode;
  secondTitle?: React.ReactNode;
  icon?: React.ReactNode;
  description?: React.ReactNode;
};

export default function InfoBrick({
  firstTitle,
  secondTitle,
  icon,
  description,
}: InfoBrickProps) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const firstTitleRef = useRef<HTMLSpanElement>(null);
  const secondTitleRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLSpanElement>(null);

  const [hoverState, setHoverState] = useState(HoverState.LeaveDone);

  const isEnter = useMemo(() => {
    return hoverState !== HoverState.LeaveDone;
  }, [hoverState]);

  useEffect(() => {
    if (hoverState !== HoverState.Leave) return;

    const timeoutId = setTimeout(() => {
      setHoverState(HoverState.LeaveDone);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hoverState]);

  return (
    <div className='flex-1 text-center'>
      <div
        onMouseLeave={() => setHoverState(HoverState.Leave)}
        onMouseEnter={() => setHoverState(HoverState.Enter)}
        className='relative flex select-none flex-col items-center justify-center rounded-3xl bg-white px-8 py-6 text-black shadow-lg shadow-black/25'
      >
        <CSSTransition
          timeout={0}
          in={isEnter}
          nodeRef={iconRef}
          classNames={{
            enter: 'max-h-screen scale-100',
            enterDone: 'max-h-0 scale-0',
            exit: 'max-h-0 scale-0',
            exitDone: 'max-h-screen scale-100',
          }}
        >
          <span ref={iconRef} className='transition-all duration-1000'>
            {icon}
          </span>
        </CSSTransition>
        <CSSTransition
          timeout={0}
          in={isEnter}
          nodeRef={firstTitleRef}
          classNames={{ enterDone: 'text-xl', exitDone: 'text-2xl' }}
        >
          <span
            ref={firstTitleRef}
            className='text-2xl font-semibold transition-all duration-1000'
          >
            {firstTitle}
          </span>
        </CSSTransition>
        <CSSTransition
          timeout={0}
          in={isEnter}
          nodeRef={secondTitleRef}
          classNames={{ enterDone: 'text-lg', exitDone: 'text-xl' }}
        >
          <span
            ref={secondTitleRef}
            className='text-xl font-semibold transition-all duration-1000'
          >
            {secondTitle}
          </span>
        </CSSTransition>
        <CSSTransition
          timeout={0}
          in={isEnter}
          nodeRef={descriptionRef}
          classNames={{
            enter: 'max-h-0 scale-0',
            enterDone: 'max-h-screen scale-100',
            exit: 'max-h-screen scaly-100',
            exitDone: 'max-h-0 scale-0',
          }}
        >
          <span
            ref={descriptionRef}
            className='max-h-0 scale-0 text-sm transition-all duration-1000'
          >
            {description}
          </span>
        </CSSTransition>
      </div>
    </div>
  );
}
