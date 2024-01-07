import Calendar from 'react-calendar';

type ProfileCalendarProps = {
  className?: string;
};

export default function ProfileCalendar({ className }: ProfileCalendarProps) {
  return (
    <div
      className={`${className} flex h-full w-full items-center justify-center pb-4 lg:text-sm sm:text-xs`}
    >
      <div className='calendar lg:p-0'>
        <Calendar
          formatMonthYear={(locale, date) =>
            date.toLocaleString(locale, {
              month: 'long',
            })
          }
        />
      </div>
    </div>
  );
}
