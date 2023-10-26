import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/Header/Header';
import Footer from '@/components/Footer';
import { StoreRoot } from '@/components/StoreRoot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import localFont from 'next/font/local';
import AuthContext from '@/components/AuthContext';

const montserrat = localFont({
  src: [
    {
      path: '../public/fonts/Montserrat-Light.ttf',
      weight: '300',
    },
    {
      path: '../public/fonts/Montserrat-Regular.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/Montserrat-Medium.ttf',
      weight: '500',
    },
    {
      path: '../public/fonts/Montserrat-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../public/fonts/Montserrat-Bold.ttf',
      weight: '700',
    },
    {
      path: '../public/fonts/Montserrat-ExtraBold.ttf',
      weight: '800',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Brief',
  description: 'Easy to brief',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <StoreRoot>
          <AuthContext>
            <Header />
            <main className='min-h-screen'>{children}</main>
            <Footer />
            <ToastContainer position='bottom-left' theme='dark' />
          </AuthContext>
        </StoreRoot>
      </body>
    </html>
  );
}
