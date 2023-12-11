import Image from 'next/image';
import { RiAccountCircleLine } from 'react-icons/ri';
import SafeInput from '@/components/SafeInput';
import { useForm } from 'react-hook-form';
import UserService from '@/services/user.service';

type ProfileInfoProps = {
  user: IResponseUserData;
  setUser: (user: IResponseUserData) => void;
};

type FormValues = {
  email: string;
  password: string;
};

export const ProfileInfo = ({ user, setUser }: ProfileInfoProps) => {
  const { handleSubmit, register } = useForm<FormValues>();

  const handleChangeUserData = async (data: FormValues) => {
    setUser(await UserService.update(data));
  };

  return (
    <div className='text-sm font-semibold'>
      <div className='flex items-center border-b border-[#cccccc] py-2'>
        {user.avatar ? (
          <Image
            className='rounded-full'
            src={user.avatar}
            alt='Аватар'
            width='80'
            height='80'
          />
        ) : (
          <RiAccountCircleLine className='h-20 w-20' />
        )}
        <p className='h-full px-4 py-2 transition'>{user.name}</p>
      </div>
      <form onSubmit={handleSubmit(handleChangeUserData)}>
        <SafeInput
          title='Email'
          titleClassName='text-start my-2'
          blockClassName='m-0'
          inputClassName='enabled:py-2'
          defaultValue={user.email}
          register={register}
          registerTitle='email'
          registerOptions={{
            required: true,
            pattern: /^\S+@\S+\.\S+$/,
          }}
        />
        <SafeInput
          title='Пароль'
          titleClassName='text-start my-2'
          blockClassName='m-0'
          inputClassName='enabled:py-2'
          placeholder='Введите пароль'
          type='password'
          register={register}
          registerTitle='password'
          registerOptions={{ required: true, minLength: 6, maxLength: 40 }}
        />
        <button
          type='submit'
          className='btn profile absolute bottom-0 left-0 right-0 mb-5 mt-5'
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};
