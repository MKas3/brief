import { ModalLabel, ModalLabelProps } from '@/components/Modal/ModalLabel';
import { Input } from '@/components/Input';
import { useEffect, useState } from 'react';
import { TextArea } from '@/components/TextArea';

type BriefModalFieldProps = ModalLabelProps & {
  isIncorrectMode: boolean;
  inputValue?: string | number;
  onSelect?: (selected: boolean) => void;
  value?: boolean;
};

export const BriefModalField = ({
  children,
  isIncorrectMode,
  inputValue,
  onSelect,
  value = false,
  ...otherProps
}: BriefModalFieldProps) => {
  const [selected, setSelected] = useState(value);

  const handleClick = () => {
    const newSelected = !selected;
    setSelected(newSelected);
    if (onSelect) onSelect(newSelected);
  };

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className='flex items-center gap-x-4'>
      <ModalLabel
        className='w-full'
        titleClassName='font-bold text-2xl'
        mainClassName='gap-y-0 mt-0'
        {...otherProps}
      >
        {children}
        <TextArea
          defaultValue={inputValue}
          className={(selected ? 'bg-[#FFEAEA] ' : '') + 'py-2 text-2xl'}
          readOnly
        />
      </ModalLabel>
      {isIncorrectMode && (
        <span
          className={
            (selected ? 'after:bg-[#cccccc] ' : '') +
            'flex h-10 w-10 flex-shrink-0 flex-grow-0 cursor-pointer items-center justify-center rounded-full border-4 border-[#cccccc] p-1 after:inline-block after:h-full after:w-full after:rounded-full after:transition'
          }
          onClick={handleClick}
        ></span>
      )}
    </div>
  );
};
