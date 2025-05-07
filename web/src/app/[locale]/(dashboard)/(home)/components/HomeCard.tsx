import { cn } from '@/lib/utils';
import { Route } from 'next';
import Link from 'next/link';
export type HomeCardProps = {
    title: string;
    count: number | undefined;
    bg?: string;
    url?: Route;
};
const HomeCard = ({ title, count, bg, url }: HomeCardProps) => {
    return (
        <Link
            href={url ?? '/'}
            className={cn(
                'flex h-fit items-center justify-between gap-2 rounded-md border px-4 py-2 shadow-md transition-all',
                bg,
            )}
        >
            <h2 className='text-sm font-medium'>{title}</h2>
            <p className='text-lg font-bold'>{count}</p>
        </Link>
    );
};

export default HomeCard;
