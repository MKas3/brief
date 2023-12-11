import BriefsContainer from '@/components/Profile/BriefsContainer/BriefsContainer';
import BriefService from '@/services/brief.service';
import { useEffect, useState } from "react";
import UserService from "@/services/user.service";
import { IClient, IResponseBrief } from "@/types/brief.types";

type ClientsProps = {
  briefs: IResponseBrief[];
  addClient: () => void;
  maxClients?: number;
};

export const Clients = ({ addClient, briefs, maxClients = 10 }: ClientsProps) => {
  const [clients, setClients] = useState<IClient[]>([]);

  const handleButtonClick = () => {
    if (addClient) addClient();
  };

  useEffect(() => {
    const getClients = async() => {
      setClients(await UserService.findAllClient());
    }
    getClients();
  }, [briefs, maxClients]);

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col'>
        {clients.slice(0, maxClients).map((el, index) => (
          <span
            key={index}
            className='flex gap-x-2 items-baseline border-b border-[#cccccc]'
          >
            <span className=''> {`${index + 1}.\t`} </span>
            <div className='flex items-start flex-col gap-y-0.5 py-2 leading-4'>
              <span>
                {`${el.clientName}`}
              </span>
              <span>
                {`${el.title}`}
              </span>
              <span className='text-xs text-[#747474]'>
                {`${el.clientEmail}`}
              </span>
            </div>
          </span>
        ))}
      </div>
      <button
        type='button'
        className='btn profile absolute bottom-0 left-0 right-0 mb-5 mt-5'
        onClick={() => addClient && addClient()}
      >
        Добавить заказчика
      </button>
    </div>
  );
};
