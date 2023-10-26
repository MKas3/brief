import { Menu, Transition } from '@headlessui/react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/user.recoil';
import Link from 'next/link';
import { HOME_ROUTE, PROFILE_ROUTE } from '@/utils/consts';
import AuthService from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function ProfileButton() {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  const handleLogOut = () => {
    AuthService.logout();
    setUser(null);
    router.push(HOME_ROUTE);
    toast.success('Come back soon');
  };

  return (
    <Menu as='div' className='relative flex items-center text-left'>
      {({ open }) => (
        <>
          <Menu.Button className='my-auto'>
            <div className='flex cursor-pointer items-center gap-x-2 text-sm text-white transition hover:text-zinc-400'>
              <div className='rounded-full border-[1px] border-zinc-900'>
                <RiAccountCircleLine className='text-3xl' />
              </div>
              <p>{user?.name}</p>
            </div>
          </Menu.Button>
          <Transition
            show={open}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
          >
            <Menu.Items
              static
              className='absolute right-0 mt-5 flex w-fit origin-top-right flex-col items-center rounded-xl bg-white p-3 text-black shadow-sm shadow-neutral-800/75 focus:outline-none'
            >
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={
                      (active ? 'bg-zinc-300 ' : 'bg-white ') +
                      'my-1 w-full whitespace-nowrap px-2 py-1 transition'
                    }
                    href={PROFILE_ROUTE}
                  >
                    Профиль
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                <div className='relative h-2 w-full'>
                  <div className='absolute -top-1/2 h-full w-full border-b border-black'></div>
                </div>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={
                      (active ? 'bg-zinc-300 ' : 'bg-white ') +
                      'my-1 w-full whitespace-nowrap px-2 py-1 transition'
                    }
                    onClick={() => handleLogOut()}
                  >
                    Выход
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
