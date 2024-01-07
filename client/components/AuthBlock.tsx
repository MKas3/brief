'use client';

import { useForm } from 'react-hook-form';
import SafeInput from '@/components/SafeInput';
import { useState } from 'react';
import AuthService from '@/services/auth.service';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/user.recoil';
import { useRouter } from 'next/navigation';
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '@/utils/consts';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import Separator from '@/components/Separator';
import { IoIosArrowBack } from 'react-icons/io';
import { useGoogleLogin } from '@react-oauth/google';

type AuthBlockProps = {
  isLogin: boolean;
};

type FormValues = {
  email: string;
  password: string;
  name: string;
};

export default function AuthBlock({ isLogin }: AuthBlockProps) {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const { register, handleSubmit } = useForm<FormValues>();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        let userData;
        if (isLogin)
          userData = await AuthService.loginByGoogle({
            token: res.access_token,
          });
        else
          userData = await AuthService.registerByGoogle({
            token: res.access_token,
          });

        handleAuthComplete(userData);
      } catch (e: any) {
        handleAuthError(e);
      }
    },
  });

  const handleAuthComplete = (userData: IResponseUserData) => {
    setUser(userData);
    router.push(HOME_ROUTE);
    toast.success('Добро пожаловать!');
  };

  const handleAuthError = (error: any) => {
    let message = error.response.data.message;
    message = message instanceof Array ? message[0] : message;
    toast.error(message ?? error.message);
  };

  const handleAuth = async (data: FormValues) => {
    try {
      let userData;
      if (isLogin) userData = await AuthService.login(data);
      else userData = await AuthService.register(data);

      handleAuthComplete(userData);
    } catch (e: any) {
      handleAuthError(e);
    }
  };

  return (
    <div className='my-32 flex w-2/3 flex-col gap-y-3 lg:w-4/5 md:w-full sm:w-full'>
      <h1 className='text-center text-3xl font-extrabold sm:text-2xl'>
        {isLogin ? 'Логин' : 'Регистрация'}
      </h1>
      <p className='mx-10 mb-4 text-center sm:text-[10px]'>
        {isLogin ? (
          <>
            Всегда будьте рядом с более чем 500 профессионалами, <br />
            ведущим свой бизнес с помощью BriefMe.
          </>
        ) : (
          <>
            Присоединяйтесь к более чем 500 профессионалам, <br />
            ведущим свой бизнес с помощью BriefMe.
          </>
        )}
      </p>
      <form
        onSubmit={handleSubmit(handleAuth)}
        className='flex flex-col items-center gap-y-2 sm:gap-y-1'
      >
        <button
          type='button'
          className='flex w-1/2 items-center justify-center gap-x-2 rounded-lg border-2 border-zinc-300 bg-white px-4 py-3 font-medium text-neutral-900 transition hover:bg-zinc-300 sm:w-3/4 sm:rounded-2xl'
          onClick={() => handleGoogleAuth()}
        >
          <FcGoogle className='text-2xl' />
          {isLogin ? 'Sign In with Google' : 'Sign Up with Google'}
        </button>
        <Separator className='mt-3 sm:mt-0.5 sm:w-3/4'>или</Separator>
        {!isLogin && (
          <>
            <SafeInput
              title='Имя пользователя'
              className='w-1/2 sm:w-3/4'
              titleClassName='font-medium ml-6'
              blockClassName='mt-1'
              inputClassName='px-4 py-2 rounded-lg'
              register={register}
              registerTitle='name'
              registerOptions={{
                required: true,
                minLength: 4,
                maxLength: 20,
              }}
            />
          </>
        )}
        <SafeInput
          title='Email'
          className='w-1/2 sm:w-3/4'
          titleClassName='font-medium ml-6'
          blockClassName='mt-1'
          inputClassName='px-4 py-2 rounded-lg'
          register={register}
          registerTitle='email'
          registerOptions={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
        />
        <SafeInput
          type={isShowPassword ? 'text' : 'password'}
          title='Пароль'
          className='w-1/2 sm:w-3/4'
          safeInputClassName='w-full'
          titleClassName='font-medium ml-6'
          blockClassName='relative flex items-center mt-1'
          inputClassName='px-4 py-2 rounded-lg'
          register={register}
          registerTitle='password'
          registerOptions={{ required: true, minLength: 6, maxLength: 40 }}
        >
          {isShowPassword ? (
            <FaEye
              onClick={() => setIsShowPassword(!isShowPassword)}
              className='absolute right-3 text-xl text-black transition hover:text-zinc-700'
            />
          ) : (
            <FaEyeSlash
              onClick={() => setIsShowPassword(!isShowPassword)}
              className='absolute right-3 text-xl text-black transition hover:text-zinc-700'
            />
          )}
        </SafeInput>
        <div className='mt-8 grid grid-cols-4 gap-x-4 sm:gap-x-12'>
          <button
            type='button'
            className='w-fit justify-self-end rounded-2xl border-2 border-zinc-300 bg-white px-4 py-3 text-xl font-medium text-neutral-900 transition hover:bg-zinc-300 sm:px-2 sm:py-2'
            onClick={() => router.push(HOME_ROUTE)}
          >
            <IoIosArrowBack className='text-2xl' />
          </button>
          <button className='w-fit max-w-full col-span-2 md:text-lg justify-self-center rounded-2xl border-2 border-zinc-300 bg-white px-6 py-3 text-xl font-medium text-neutral-900 transition hover:bg-zinc-300 sm:px-4 sm:py-2 sm:text-sm'>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>
        <Separator className='mt-2 sm:w-3/4' blockClassName='text-xs'>
          {isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}
        </Separator>

        <button
          type='button'
          className='mt-3 flex w-fit self-center rounded-2xl border border-white px-24 py-3 text-xl font-medium transition hover:bg-neutral-800 sm:px-12 sm:text-sm'
          onClick={() =>
            router.push(isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE)
          }
        >
          {isLogin ? 'Регистрация' : 'Войти'}
        </button>
      </form>
    </div>
  );
}
