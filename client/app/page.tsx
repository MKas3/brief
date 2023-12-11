import { HomeMainBlock } from '@/components/Home/HomeMainBlock';
import AnimatedStripes from '@/components/Home/AnimatedStripes';
import InfoBlock from '@/components/Home/InfoBlock';
import { InfoBricks } from '@/components/Home/InfoBricks';

export default function Home() {
  return (
    <div>
      <section
        id='home'
        className='flex h-screen bg-gradient-to-tl from-black from-30% to-neutral-800'
      >
        <HomeMainBlock />
        <AnimatedStripes />
      </section>
      <div className='bg-white'>
        <div className='relative z-20 h-[20vh] sm:h-[40vh]'>
          <InfoBricks />
        </div>

        <section id='about' className='pb-20 sm:pb-0 flex flex-col gap-y-16 sm:gap-y-0'>
          <InfoBlock
            title='Как работает BriefMe'
            imagePath='/info/info1.png'
            description={
              <>
                <p>
                  Онлайн-платформа
                  <span className='mx-1 font-semibold'>BriefMe</span>– это микс
                  публичности и приватности. Больше не нужно упрашивать заказчиков
                  на <span className='ml-1 font-semibold'>бриф</span>, достаточно
                  предоставить ссылку на сервис и оформить концептуалльный бриф
                  благодаря
                  <span className='mx-1 font-semibold'>
                  искусственному интеллекту
                </span>
                  для дальнейшей работы.
                </p>
                <p>
                  Для этого мы создали онлайн-кабинеты для каждых клиентов,
                  исполнителей и поддержку
                  <span className='ml-1 font-semibold'>24/7</span>.
                </p>
              </>
            }
          />
          <InfoBlock
            title='Как пользоваться BriefMe'
            imagePath='/info/info2.png'
            last
            description={
              <>
                <p>
                  Больше не нужно выдумывать! Заказчик сделает все сам.
                  <span className='mx-1 font-semibold'>Нейросеть</span>
                  подберет нужные варианты, нарисует
                  <span className='ml-1 font-semibold'>черновые макеты</span>, а
                  вам останется
                  <span className='mx-1 font-semibold'>выбрать</span>
                  понравившиеся и дозаполнить бриф точной информацией
                  <span className='mx-1 font-semibold'>о вашей компании</span>.
                </p>
                <p>
                  Дизайнер
                  <span className='mx-1 font-semibold'>обделен общением</span> со
                  своим любимым клиентом?
                  <span className='ml-1 font-semibold'>
                  Да, а может это и к лучшему....
                </span>
                </p>
              </>
            }
          />
        </section>
      </div>
    </div>
  );
}
