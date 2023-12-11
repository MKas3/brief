import Calendar from 'react-calendar';

type ProfileCalendarProps = {
  className?: string;
};

export default function ProfileCalendar({ className }: ProfileCalendarProps) {
  return (
    <div className={`${className} h-full w-full`}>
      <div className='calendar'>
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
