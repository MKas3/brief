import BriefsList from '@/components/Briefs/BriefsList';
import BriefButton from '@/components/Briefs/BriefButton';

export default function Briefs() {
  return (
    <>
      <div className='mx-44 my-12'>
        <div className='mb-10 w-4/5 text-6xl font-bold'>
          Создай самый простой бриф
        </div>
        <BriefButton className='mb-10' />
        <BriefsList />
      </div>
    </>
  );
}
