import { Attributes, HTMLAttributes, ReactHTML, useCallback, useEffect, useRef } from "react";
import { MotionValue, motion, MotionProps } from "framer-motion";

export type ProfileBlock = {
  onChangeHeight?: (height: number) => void;
};

type ProfileBlockWrapperProps = MotionProps & ProfileBlock;

export const ProfileBlockWrapper = ({
  onChangeHeight,
  ...props
}: ProfileBlockWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (onChangeHeight) onChangeHeight(ref.current?.offsetHeight ?? 0);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [onChangeHeight]);

  return (
    <motion.div
      ref={ref}
      className='grid w-full grid-cols-2 grid-rows-2 gap-x-12 gap-y-4'
      layout='position'
      {...props}
    />
  );
};
