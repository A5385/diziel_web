'use client';
import { useTranslations } from 'next-intl';

export const FormCriteria = ({ missingCriteria }: { missingCriteria: string[] }) => {
    const t = useTranslations();
    const criteriaList = ['length', 'lowercase', 'uppercase', 'number', 'special'];
    return (
        <div className='mt-3 flex w-full flex-col justify-start'>
            {criteriaList.map((criterion, index) => (
                <span
                    key={index}
                    className={`${
                        missingCriteria.includes(criterion)
                            ? 'text-main dark:text-blue-300'
                            : 'hidden'
                    } text-start text-xs font-semibold`}
                >
                    {t(criterion, { defaultValue: `${criterion}` })}
                </span>
            ))}
        </div>
    );
};
