'use client';

import {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { PaginateButton } from '@/components/BriefSteps/Paginate/PaginateButton';
import { CSSTransition } from 'react-transition-group';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';

type PaginateProps = {
  pageCount?: number;
  maxLeft?: number;
  onPageChange?: (selected: number) => void;
  className?: string;
  pageClassName?: string;
  defaultValue?: number;
  canChange?: (page: number) => boolean;
};

export const Paginate = forwardRef(function Paginate(
  {
    pageCount = 0,
    maxLeft = 1,
    onPageChange,
    className,
    pageClassName,
    defaultValue,
    canChange,
  }: PaginateProps,
  ref,
) {
  const [page, setPage] = useContext(BriefStepContext);
  const [arr] = useState(Array.from<number>({ length: pageCount - 1 }));
  const [endTranslate, setEndTranslate] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );
  const paginateRef = useRef<HTMLDivElement>(null);
  const breakLabelRef = useRef<HTMLParagraphElement>(null);

  const endTranslateClass = useMemo(
    () => `translate-x-paginate-${endTranslate}`,
    [endTranslate],
  );

  const translate = useMemo(
    () =>
      page + 1 < maxLeft
        ? 0
        : page + 1 < pageCount - 1
        ? page + 2 - maxLeft
        : pageCount - 1 - maxLeft,
    [page, maxLeft, pageCount],
  );

  useEffect(() => {
    if (defaultValue) setPage(defaultValue);
  });

  useEffect(() => {
    if (isMoving) clearTimeout(timeoutId);
    if (onPageChange) onPageChange(page);
    setPage(page);
    setIsMoving(true);
    return setMovingTimeout(translate);
  }, [page, maxLeft, onPageChange, pageCount, setPage]);

  useEffect(() => {
    if (isMoving) setPage(page);
  }, [page, isMoving, setPage]);

  const setMovingTimeout = (translate: number) => {
    setEndTranslate(translate);

    setTimeoutId(
      setTimeout(() => {
        setIsMoving(false);
      }, 700),
    );

    return () => {
      setIsMoving(false);
      clearTimeout(timeoutId);
    };
  };

  const handlePaginateClick = (page: number) => {
    if (!canChange || canChange(page)) setPage(page);
  };

  return (
    <div className={(className ? `${className} ` : '') + 'flex'}>
      <div className='max-w-[13.25rem] overflow-hidden'>
        <CSSTransition
          nodeRef={paginateRef}
          timeout={0}
          in={isMoving}
          classNames={{
            enter: 'transition-all duration-700',
            enterDone: `${endTranslateClass} transition-all duration-700`,
            exit: `${endTranslateClass} transition-all duration-700`,
            exitDone: `${endTranslateClass} transition-all duration-700`,
          }}
        >
          <div
            className='flex translate-x-paginate-0 gap-x-2'
            ref={paginateRef}
          >
            {arr.map((el, index) => (
              <PaginateButton
                key={index}
                isActive={page === index}
                className={pageClassName}
                activeClassName='bg-black text-white transition duration-500'
                inactiveClassName='hover:bg-black/20 transition duration-75'
                onClick={() => handlePaginateClick(index)}
              >
                {index + 1}
              </PaginateButton>
            ))}
          </div>
        </CSSTransition>
      </div>
      <CSSTransition
        timeout={0}
        nodeRef={breakLabelRef}
        in={page >= pageCount - 3}
        classNames={{
          enter: 'scale-100 max-w-screen mx-2',
          enterDone: 'scale-0 max-w-0 mx-0',
          exit: 'scale-0 max-w-0 mx-0',
          exitDone: 'scale-100 max-w-screen mx-2',
        }}
      >
        <p
          ref={breakLabelRef}
          className='mx-2 select-none whitespace-nowrap text-2xl font-bold transition-all duration-700'
        >
          · · ·
        </p>
      </CSSTransition>

      <PaginateButton
        isActive={page === pageCount - 1}
        className={pageClassName ? `${pageClassName} ` : '' + 'ml-2'}
        activeClassName='bg-black text-white transition duration-500'
        inactiveClassName='hover:bg-black/20 transition duration-75'
        onClick={() => handlePaginateClick(pageCount - 1)}
      >
        {pageCount}
      </PaginateButton>
    </div>
  );
});
