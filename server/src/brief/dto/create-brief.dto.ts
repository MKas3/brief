import { Prisma } from '@prisma/client';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateBriefDto implements Prisma.BriefUpdateInput {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  companyClasses?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  emotions?: string;

  @IsOptional()
  @IsString()
  interactionChannels?: string;

  @IsOptional()
  @IsString()
  clientDescription?: string;

  @IsOptional()
  @IsString()
  concurrents?: string;

  @IsOptional()
  @IsString()
  worth?: string;

  @IsOptional()
  @IsString()
  styleExamples?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  experiments?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  endPeople?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  lastAction?: number;

  @IsOptional()
  @IsString()
  prompt?: string;
}
