import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import React from 'react';
import { Input, InputProps } from '@/components/Input';

export type SafeInputProps<T extends FieldValues> = InputProps & {
  register: UseFormRegister<T>;
  registerTitle: Path<T>;
  registerOptions?: RegisterOptions<T, Path<T>>;
  safeInputClassName?: string;
};

export default function SafeInput<T extends FieldValues>({
  className,
  register,
  registerTitle,
  registerOptions,
  safeInputClassName,
  ...otherProps
}: SafeInputProps<T>) {
  return (
    <div className={(className ? `${className} ` : '') + 'mt-1'}>
      <Input
        className={safeInputClassName}
        {...register(registerTitle, registerOptions)}
        {...otherProps}
      />
    </div>
  );
}
