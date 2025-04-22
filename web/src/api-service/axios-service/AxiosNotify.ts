//packages\api-service\src\http-axios\AxiosNotify.ts
import { NotifyMsgType } from '@/types/service';
import { toast } from 'sonner';

export default function notify({ message, type }: NotifyMsgType) {
    return toast[type](message, {
        position: 'bottom-right',
        duration: 5000,
    });
}
