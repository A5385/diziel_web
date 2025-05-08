// 'use client';
// import { useDialog } from '@/providers/DialogProvider';
// import { TanstackTableProps } from '@/types/ui';
// import { useTranslations } from 'next-intl';
// import { ReactNode } from 'react';

// export type ArchievedDataPropsType<TValue> = TanstackTableProps<TValue> & {
//     children?: ReactNode;
// };
// const ArchievedDataTable = <TValue,>({
//     children,
//     ...tableProps
// }: ArchievedDataPropsType<TValue>) => {
//     const t = useTranslations();
//     const { handleOpenDialog } = useDialog();
//     return (
//         <div className='flex w-full flex-col justify-start gap-8'>
//             <DashboardTitle
//                 {...{
//                     title: t('archieved'),
//                     icon: <ArchievedIcon size={40} />,
//                 }}
//             >
//                 <AKButton
//                     {...{
//                         size: 'icon',
//                         type: 'button',
//                         color: 'green',
//                         icon: <ActiveIcon size={20} />,
//                         onClick: () =>
//                             handleOpenDialog({
//                                 type: 'activate-many',
//                                 dialogSize: 'sm',
//                             }),
//                     }}
//                 />
//                 {children}
//             </DashboardTitle>
//             <BasicTable {...(tableProps ?? ({} as TanstackTableProps<TValue>))} />
//         </div>
//     );
// };

// export default ArchievedDataTable;
