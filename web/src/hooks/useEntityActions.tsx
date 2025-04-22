'use client';

import { useDialog } from '@/providers/DialogProvider';
import { QueryVariablesType } from '@/types/service';
import { UseMutationResult } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

export const useEntityActions = <T,>({
    deleteEntityFn,
    createEntityFn,
    updateEntityFn,
    data,
    successActions,
}: {
    deleteEntityFn?: UseMutationResult<void, Error, string>;
    createEntityFn?: UseMutationResult<
        T | null,
        Error,
        {
            data: object;
        }
    >;
    updateEntityFn?: UseMutationResult<T | null, Error, QueryVariablesType>;
    successActions?: (() => void)[];
    suspendedSelect?: T[];
    data?: T[] | undefined;
}) => {
    const { editItemId, handleCloseDialog } = useDialog();
    const g = useTranslations();

    const confirmDelete = useCallback(async () => {
        if (deleteEntityFn) {
            deleteEntityFn.mutate(editItemId as string, {
                onSuccess: () => {
                    if (successActions && successActions.length > 0) {
                        for (const action of successActions) {
                            handleCloseDialog();
                            action();
                        }
                    }
                },
            });
        }
    }, [deleteEntityFn, editItemId, g, handleCloseDialog]);

    const editEntity: T | undefined = useMemo(() => {
        return data?.find((entity) => (entity as T & { id: string })?.id === editItemId);
    }, [data, editItemId]);

    const createEntity = useCallback(async (variables: { data: object }) => {
        if (createEntityFn) {
            const res = await createEntityFn.mutateAsync(variables);
            if (res) {
                if (successActions && successActions.length > 0) {
                    for (const action of successActions) {
                        action();
                    }
                }
                handleCloseDialog();
                return res;
            }
        }
    }, []);

    const updateEntity = useCallback(async (variables: QueryVariablesType) => {
        if (updateEntityFn) {
            const res = await updateEntityFn.mutateAsync(variables);
            if (res) {
                if (successActions && successActions.length > 0) {
                    for (const action of successActions) {
                        action();
                    }
                }
                handleCloseDialog();
                return res;
            }
        }
    }, []);

    return {
        moduleAction: {
            confirmDelete,
        },
        deleteEntity: confirmDelete,
        createEntity,
        updateEntity,
        editEntity,
    };
};
