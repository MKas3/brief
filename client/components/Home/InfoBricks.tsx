import InfoBrick from '@/components/Home/InfoBrick';
import { LuTimerReset } from 'react-icons/lu';
import { PiHandTap } from 'react-icons/pi';
import { BsSpellcheck } from 'react-icons/bs';
import { LiaBusinessTimeSolid } from 'react-icons/lia';
import InfoBricksRevealWrapper from '@/components/Home/InfoBricksRevealWrapper';

export function InfoBricks() {
  return (
    <InfoBricksRevealWrapper>
      <div className='absolute -top-10 left-0 right-0 mx-[10vw] grid grid-cols-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-y-8 sm:gap-x-8 gap-x-8 h-full'>
        <InfoBrick
          icon={<LuTimerReset size={65} />}
          firstTitle='Скорость'
          secondTitle='решения задач'
          description='Забудьте о долгих раздумьях, наш сервис решит вашу задачу быстро и эффективно.'
        ></InfoBrick>
        <InfoBrick
          icon={<PiHandTap size={65} />}
          firstTitle='Удобное'
          secondTitle='использование'
          description='Наш сервис - ваш помощник в создании брифов, максимальное удобство и минимум затрат времени.'
        ></InfoBrick>
        <InfoBrick
          icon={<BsSpellcheck size={65} />}
          firstTitle='Простота'
          secondTitle='брифинга'
          description='Написание брифов стало проще с нашим сервисом - просто, удобно, быстро! Брифы без головной боли.'
        ></InfoBrick>
        <InfoBrick
          icon={<LiaBusinessTimeSolid size={65} />}
          firstTitle='Отлаженная'
          secondTitle='работа'
          description='Наш сервис обеспечивает быструю и эффективную работу при написании подробных и четких брифов'
        ></InfoBrick>
      </div>
    </InfoBricksRevealWrapper>
  );
}
