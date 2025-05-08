import { Table as TableType } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useArabic } from '../../../hooks/useArabic';
import { NextIcon, PreviousIcon } from '../../../styles/icons';
import { AKButton } from '../../my-components/AKButton';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from '../../ui/pagination';

interface TablePaginationNavigationProps<TData> {
    table: TableType<TData>;
}

export function TablePaginationNavigation<TData>({ table }: TablePaginationNavigationProps<TData>) {
    const g = useTranslations();
    const isRtl = useArabic();
    const styles = {
        pagItem: 'bg-main text-gray-200 rounded-md hover:cursor-pointer',
        currentPage: 'bg-sec text-gray-200 rounded-md',
        icon: isRtl ? 'transform rotate-180' : '',
    };

    const iconProps = {
        size: 20,
        className: styles.icon,
    };

    return (
        <Pagination className='flex-1'>
            <PaginationContent>
                <PaginationItem className={styles.pagItem}>
                    <AKButton
                        type='button'
                        title={g('previous')}
                        onClick={() => table.previousPage()}
                        iconBefore={<PreviousIcon {...iconProps} />}
                    />
                    {/* <PaginationPrevious onClick={() => table.previousPage()}/> */}
                </PaginationItem>
                {table.getState().pagination.pageIndex + 1 >= 4 && (
                    <PaginationItem className={styles.pagItem}>
                        <PaginationLink onClick={() => table.setPageIndex(0)} size={undefined}>
                            1
                        </PaginationLink>
                    </PaginationItem>
                )}
                {table.getState().pagination.pageIndex + 1 >= 5 && (
                    <PaginationItem className={styles.pagItem}>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {/* 2 pages before */}
                {table.getState().pagination.pageIndex + 1 - 2 > 0 && (
                    <PaginationItem className={styles.pagItem}>
                        <PaginationLink
                            size={undefined}
                            onClick={() =>
                                table.setPageIndex(table.getState().pagination.pageIndex - 2)
                            }
                        >
                            {table.getState().pagination.pageIndex + 1 - 2}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {/* 1 page before */}
                {table.getState().pagination.pageIndex + 1 - 1 > 0 && (
                    <PaginationItem className={styles.pagItem}>
                        <PaginationLink
                            size={undefined}
                            onClick={() =>
                                table.setPageIndex(table.getState().pagination.pageIndex - 1)
                            }
                        >
                            {table.getState().pagination.pageIndex + 1 - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {/* Current page */}
                <PaginationItem className={styles.currentPage}>
                    <PaginationLink size={undefined}>
                        {table.getState().pagination.pageIndex + 1}
                    </PaginationLink>
                </PaginationItem>
                {/* 1 page after */}
                {table.getState().pagination.pageIndex + 1 + 1 <= table.getPageCount() && (
                    <PaginationItem className={styles.pagItem}>
                        <PaginationLink
                            size={undefined}
                            onClick={() =>
                                table.setPageIndex(table.getState().pagination.pageIndex + 1)
                            }
                        >
                            {table.getState().pagination.pageIndex + 1 + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {/* 2 pages after */}
                {table.getState().pagination.pageIndex + 1 + 2 <= table.getPageCount() && (
                    <PaginationItem className={styles.pagItem}>
                        <PaginationLink
                            size={undefined}
                            onClick={() =>
                                table.setPageIndex(table.getState().pagination.pageIndex + 2)
                            }
                        >
                            {table.getState().pagination.pageIndex + 1 + 2}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {table.getState().pagination.pageIndex + 1 + 2 < table.getPageCount() - 1 && (
                    <PaginationItem className='bg-main rounded-md text-gray-200'>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {table.getState().pagination.pageIndex + 1 + 2 < table.getPageCount() && (
                    <>
                        <PaginationItem className={styles.pagItem}>
                            <PaginationLink
                                size={undefined}
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            >
                                {table.getPageCount()}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                <PaginationItem className={styles.pagItem}>
                    <AKButton
                        type='button'
                        title={g('next')}
                        onClick={() => table.nextPage()}
                        iconAfter={<NextIcon {...iconProps} />}
                    />
                    {/* <PaginationNext onClick={() => table.nextPage()} /> */}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
