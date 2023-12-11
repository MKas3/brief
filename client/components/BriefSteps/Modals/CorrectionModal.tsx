import { Modal } from '@/components/Modal/Modal';
import { TextArea } from '@/components/TextArea';
import NextPrevButtons from '@/components/NextPrevButtons';
import { useRecoilState } from "recoil";
import { briefLinkState, nextBriefEditingPageState } from "@/store/brief.recoil";
import { useEffect } from "react";
import { next } from "sucrase/dist/types/parser/tokenizer";
import { router } from "next/client";
import { BRIEFS_ROUTE } from "@/utils/consts";
import { useRouter } from "next/navigation";
import { IRequestBrief } from "@/types/brief.types";

type CorrectionModalProps = {
  visible: boolean;
  onClose: () => void;
  brief: IRequestBrief;
};

export const CorrectionModal = ({
  visible,
  onClose,
  brief,
}: CorrectionModalProps) => {
  const [link] = useRecoilState(briefLinkState);
  const [nextBriefEditingPage, setNextBriefEditingPage] = useRecoilState(nextBriefEditingPageState);
  const router = useRouter();

  const onStartEditing = () => {
    if (brief.incorrect && brief.incorrect.length > 0 && brief.incorrect.some(el => el)) {
      setNextBriefEditingPage(brief.incorrect.findIndex(el => el));
      onClose();
    }
  };

  useEffect(() => {
    if (nextBriefEditingPage && link)
      router.replace(BRIEFS_ROUTE + `/${link}/${nextBriefEditingPage + 1}`);
  }, [nextBriefEditingPage, link, router]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      titleText={`Добрый день, ${brief.clientName}, необходимо внестри правки`}
    >
      <div className='h-full flex flex-col'>
        <p className='mb-8 mt-4 text-sm font-medium'>
          Исполнитель изучил ваш бриф и выписал недочеты, которые нужно как
          можно скорее исправить
        </p>
        <p className='mb-3 text-2xl font-medium'>Комментарий:</p>
        <TextArea defaultValue={brief.incorrectMessage} readOnly />
        <NextPrevButtons
          className='justify-center items-end h-full'
          next='Редактировать'
          onNextClick={onStartEditing}
          isPrevHidden
          isNextActive
        />
      </div>
    </Modal>
  );
};
