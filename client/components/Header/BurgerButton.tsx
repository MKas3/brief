import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

export const BurgerButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className='invisible sm:visible ml-4' {...props}>
      <Image src='/burger.svg' alt='Burger' width={24} height={24} />
    </button>
  );
};
