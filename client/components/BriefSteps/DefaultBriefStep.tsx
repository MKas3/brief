import BriefStep, { BriefStepProps } from '@/components/BriefSteps/BriefStep';
import { Input } from '@/components/Input';
import React, { HTMLInputTypeAttribute, useContext } from 'react';
import { BriefContext } from '@/components/Brief/BriefContext';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import { FieldValues, Path, RegisterOptions, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import {
  briefLinkState,
  newBriefState,
  nextBriefEditingPageState,
} from '@/store/brief.recoil';
import { IRequestBrief, IResponseBrief } from '@/types/brief.types';

type DefaultBriefStepProps<FormValues extends FieldValues> = BriefStepProps & {
  formId: string;
  inputTitle: string;
  inputName: Path<FormValues> & keyof IResponseBrief;
  inputType?: HTMLInputTypeAttribute;
  inputRules?: RegisterOptions<
    FormValues,
    Path<FormValues> & keyof IResponseBrief
  >;
  actionNumber?: number;
};

export default function DefaultBriefStep<FormValues extends FieldValues>({
  formId,
  inputTitle,
  inputName,
  inputType,
  inputRules,
  nextForm,
  actionNumber,
  ...otherProps
}: DefaultBriefStepProps<FormValues>) {
  const [link] = useRecoilState(briefLinkState);
  const [brief] = useContext(BriefContext);
  const [page, setPage] = useContext(BriefStepContext);
  const { register, handleSubmit } = useForm<FormValues>();
  const [, setNewBrief] = useRecoilState(newBriefState);
  const [nextBriefEditingPage, setNextBriefEditingPage] = useRecoilState(
    nextBriefEditingPageState,
  );

  const handleChange = async (data: FormValues) => {
    const incorrect = brief.incorrect?.map((el, index) =>
      actionNumber === index + 1 ? false : el,
    );
    setNextBriefEditingPage(undefined);
    setNewBrief((prev: IRequestBrief) => ({
      ...prev,
      ...data,
      lastAction: actionNumber,
      ...(incorrect && incorrect.length > 0 ? { incorrect } : null),
    }));
    setPage((prev) => prev + 1);
  };

  return (
    <BriefStep nextForm={formId} {...otherProps}>
      <form id={formId} onSubmit={handleSubmit(handleChange)}>
        <Input
          type={inputType}
          title={inputTitle}
          autoFocus
          defaultValue={brief[inputName]?.toString()}
          {...register(inputName, {
            required: true,
            ...inputRules,
          })}
        />
      </form>
    </BriefStep>
  );
}
