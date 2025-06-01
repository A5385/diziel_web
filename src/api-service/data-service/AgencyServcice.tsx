import { AgencySchema } from '@/types/schema';
import { useMutationPost, useMutationUpdate } from '../react-query-service/mutate-service';
import { UserKey } from './UserService';

export const CreateAgency = () => {
    return useMutationPost<AgencySchema>({
        endpoint: 'agency/create',
        queryKey: [UserKey.GetAllUsers],
    });
};
export const UpdateAgency = () => {
    return useMutationUpdate<AgencySchema>({
        endpoint: 'agency/update',
        queryKey: [UserKey.GetAllUsers],
    });
};
