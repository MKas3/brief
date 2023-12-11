import { PartialType } from '@nestjs/mapped-types';
import { CreateBriefDto } from './create-brief.dto';
import { ArrayNotEmpty, IsArray, IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { Progress } from "@prisma/client";

export class UpdateBriefDto extends PartialType(CreateBriefDto) {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  clientEmail?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  incorrect?: boolean[];

  @IsOptional()
  @IsString()
  incorrectMessage?: string;

  @IsOptional()
  @IsEnum(Progress)
  progress?: Progress;
}
