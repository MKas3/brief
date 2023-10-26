import axios from 'axios';

const authInstance = axios.create({
  baseURL: 'https://api.openai.com/v1/',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  },
});

class OpenaiService {
  async GenerateImage(
    prompt: string,
    n?: number,
    size?: '256x256' | '512x512' | '1024x1024',
  ): Promise<Array<{ url: string }>> {
    const {
      data: { data },
    } = await authInstance.post('images/generations', {
      prompt,
      n,
      size,
    });
    return data;
  }
}

export default new OpenaiService();
