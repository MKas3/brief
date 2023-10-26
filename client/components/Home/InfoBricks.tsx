import InfoBrick from '@/components/Home/InfoBrick';
import { LuTimerReset } from 'react-icons/lu';
import { PiHandTap } from 'react-icons/pi';
import { BsSpellcheck } from 'react-icons/bs';
import { LiaBusinessTimeSolid } from 'react-icons/lia';
import InfoBricksRevealWrapper from '@/components/Home/InfoBricksRevealWrapper';

export function InfoBricks() {
  return (
    <InfoBricksRevealWrapper>
      <div className='absolute -top-10 left-0 right-0 mx-36 grid grid-cols-4 gap-x-8'>
        <InfoBrick
          icon={<LuTimerReset size={65} />}
          firstTitle='Скорость'
          secondTitle='решения задач'
          description={
            <p className='text-xs'>
              Забудьте о долгих раздумьях, наш сервис решит вашу задачу быстро и
              эффективно.
            </p>
          }
        ></InfoBrick>
        <InfoBrick
          icon={<PiHandTap size={65} />}
          firstTitle='Удобное'
          secondTitle='использование'
          description={
            <p>
              Наш сервис - ваш помощник в создании брифов, максимальное удобство
              и минимум затрат времени.
            </p>
          }
        ></InfoBrick>
        <InfoBrick
          icon={<BsSpellcheck size={65} />}
          firstTitle='Простота'
          secondTitle='брифинга'
          description={
            <p>
              Написание брифов стало проще с нашим сервисом - просто, удобно,
              быстро! Брифы без головной боли.
            </p>
          }
        ></InfoBrick>
        <InfoBrick
          icon={<LiaBusinessTimeSolid size={65} />}
          firstTitle='Отлаженная'
          secondTitle='работа'
          description={
            <p>
              Наш сервис обеспечивает быструю и эффективную работу при написании
              подробных и четких брифов.
            </p>
          }
        ></InfoBrick>
      </div>
    </InfoBricksRevealWrapper>
  );
}
