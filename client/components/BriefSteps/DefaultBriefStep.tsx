import BriefStep, { BriefStepProps } from '@/components/BriefSteps/BriefStep';
import { Input } from '@/components/Input';
import React, { HTMLInputTypeAttribute, useContext } from 'react';
import { BriefContext } from '@/components/Brief/BriefContext';
import { BriefStepContext } from '@/components/BriefSteps/BriefStepContext';
import { FieldValues, Path, RegisterOptions, useForm } from 'react-hook-form';
import BriefService from '@/services/brief.service';

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
  const [brief] = useContext(BriefContext);
  const [page, setPage] = useContext(BriefStepContext);
  const { register, handleSubmit } = useForm<FormValues>();

  const handleChange = async (data: FormValues) => {
    await BriefService.update(brief.id, { ...data, lastAction: actionNumber });
    setPage((prev) => prev + 1);
  };

  return (
    <BriefStep nextForm={formId} {...otherProps}>
      <form id={formId} onSubmit={handleSubmit(handleChange)}>
        <Input
          type={inputType}
          title={inputTitle}
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
