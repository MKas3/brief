import { Progress } from "@/types/progress.types";

export interface IRequestBrief {
  id?: number;
  userId?: number;
  clientEmail?: string;
  clientName?: string;
  completed?: boolean;
  title?: string;
  companyClasses?: string;
  description?: string;
  emotions?: string;
  interactionChannels?: string;
  clientDescription?: string;
  concurrents?: string;
  worth?: string;
  styleExamples?: string;
  experiments?: number;
  endPeople?: number;
  lastAction?: number;
  prompt?: string;
  incorrect?: boolean[];
  incorrectMessage?: string;
  progress?: Progress;
  doneDate?: string;
  images?: IBriefImage[];
  selectedImages?: IBriefImage[];
}

export interface IResponseBrief extends IRequestBrief {
  id: number;
  userId: number;
  images: IBriefImage[];
}

export interface IClient {
  title: string;
  clientName: string;
  clientEmail: string;
}