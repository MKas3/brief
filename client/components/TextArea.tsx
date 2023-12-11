import { Attributes, ForwardedRef, forwardRef, HTMLAttributes, TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {};

export const TextArea = forwardRef((function TextArea({ className, ...otherProps }: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <textarea
      className={
        (className ? `${className} ` : '') +
        'resize-none border-2 border-zinc-300 text-black outline-none w-full rounded-xl px-2 transition placeholder:text-zinc-600 focus:outline-zinc-800'
      }
      ref={ref}
      {...otherProps}
    />
  );
}));
