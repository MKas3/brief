import { HiMiniXMark } from 'react-icons/hi2';
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { Variants, motion } from 'framer-motion';

export type ModalBaseProps = {
  visible: boolean;
  onClose: () => void;
  onOpen?: () => void;
  canClose?: boolean;
  children?: React.ReactNode;
};

const opacity: Variants = {
  appear: {
    display: 'block',
    transition: {
      duration: 0.075,
    }
  },
  disappear: {
    opacity: 0.25,
    display: 'none',
    transition: {
      duration: 0.075,
      display: {
        delay: 0.07,
      }
    },
  }
}

const modal: Variants = {
  appear: {
    transition: {
      duration: 0.075,
    },
  },
  disappear: {
    scale: 0.8,
    transition: {
      duration: 0.075,
    },
  },
};

export const ModalBase = forwardRef(function ModalBase(
  { visible, onClose, onOpen, canClose = true, children }: ModalBaseProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && onOpen) onOpen();
  }, [visible, onOpen]);

  const onBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canClose || e.target !== bgRef.current) return;
    onClose();
  };

  return (
    <motion.div
      ref={bgRef}
      onClick={onBgClick}
      className='scrollbar fixed inset-0 z-50 hidden bg-black/20'
      variants={opacity}
      animate={visible ? 'appear' : 'disappear'}
    >
      <motion.div
        ref={ref}
        className='absolute inset-0 mx-40 sm:mx-4 my-5 flex justify-center rounded-7xl bg-white p-14 sm:p-6'
        variants={modal}
        animate={visible ? 'appear' : 'disappear'}
      >
        <button
          className='absolute right-0 top-0 m-8 w-fit'
          onClick={() => onClose()}
          hidden={!canClose}
        >
          <HiMiniXMark size={30} />
        </button>
        <div className='flex w-full h-full overflow-y-auto'>{children}</div>
      </motion.div>
    </motion.div>
  );
});
