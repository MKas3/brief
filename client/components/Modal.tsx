import { HiMiniXMark } from 'react-icons/hi2';
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  onOpen?: () => void;
  children?: React.ReactNode;
};

export const Modal = forwardRef(function Modal(
  { visible, onClose, onOpen, children }: ModalProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && onOpen) onOpen();
  }, [visible, onOpen]);

  const onBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== bgRef.current) return;
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      ref={bgRef}
      onClick={onBgClick}
      className='fixed inset-0 z-50 bg-black/20'
    >
      <div
        ref={ref}
        className='absolute inset-0 mx-40 my-5 flex justify-center rounded-7xl bg-white p-14'
      >
        <button
          className='absolute right-0 top-0 m-8 w-fit'
          onClick={() => onClose()}
        >
          <HiMiniXMark size={30} />
        </button>
        <div className='flex w-full'>{children}</div>
      </div>
    </div>
  );
});
