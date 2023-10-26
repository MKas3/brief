interface IRequestBrief {
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
  images?: IBriefImage[];
}

interface IResponseBrief extends IRequestBrief {
  id: number;
  userId: number;
  images: IBriefImage[];
}
