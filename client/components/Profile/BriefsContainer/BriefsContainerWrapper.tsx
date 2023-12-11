import { motion, Variants } from 'framer-motion';

export type BriefsContainerWrapperProps = {
  title: string;
  className?: string;
  variants?: Variants;
  initial?: string;
  animate?: string;
  children?: React.ReactNode;
};

export default function BriefsContainerWrapper({
  title,
  className,
  variants,
  initial,
  animate,
  children,
}: BriefsContainerWrapperProps) {
  return (
    <motion.div
      className={`${className} relative flex w-full flex-col items-center justify-center gap-y-3 overflow-hidden`}
      variants={variants}
      initial={initial}
      animate={animate}
    >
      <span className='text-xs font-medium'>{title}</span>
      <div className='profile container h-full'>{children}</div>
    </motion.div>
  );
}
