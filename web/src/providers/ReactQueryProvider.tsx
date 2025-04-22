'use client';
import { ChildrenType } from '@/types/general';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const ReactQueryProvider = ({ children }: ChildrenType) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
