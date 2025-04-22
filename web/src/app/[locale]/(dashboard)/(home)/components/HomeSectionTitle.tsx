import { useTranslations } from 'next-intl';

const HomeSectionTitle = ({ title, desc = '' }: { title?: string; desc?: string }) => {
    const t = useTranslations();
    return (
        <div className='flex flex-col gap-2'>
            {title && <h1 className='text-3xl font-semibold'>{t(title)}</h1>}
            <h2 className='text-sm text-slate-700 dark:text-slate-300'>{desc}</h2>
        </div>
    );
};

export default HomeSectionTitle;
