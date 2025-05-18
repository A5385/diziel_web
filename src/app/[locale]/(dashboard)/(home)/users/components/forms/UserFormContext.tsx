'use client';

import useQueryParams from '@/hooks/use-query-param';
import useLocalStorage from '@/hooks/useLocalStorage';
import { UserRole } from '@/types/prisma';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

export type UserFormContextProps = {
    phone: string | null;
    setPhone: (v: string | null) => void;
    profileId: string | null;
    setProfileId: (v: string | null) => void;
    nationalIdNumber: string | null;
    setNationalIdNumber: (v: string | null) => void;
    role: UserRole | null;
    setRole: (v: UserRole | null) => void;

    step: number;
    setStep: (n: number) => void;
    nextStep: () => void;
    previousStep: () => void;
    reset: () => void;
    isNextDisabled: boolean;
    isPreviousDisabled: boolean;
};

const UserFormContext = createContext<UserFormContextProps | null>(null);

export const UserFormProvider = ({ children }: { children: ReactNode }) => {
    const { getParam, updateSearch } = useQueryParams();
    const ls = useLocalStorage();

    // ---------- Step (from query param)
    const initialStep = parseInt(getParam('step') || '1', 10);
    const [step, _setStep] = useState<number>(initialStep);

    const setStep = (n: number) => {
        _setStep(n);
        updateSearch((p) => p.set('step', String(n)));
    };

    const nextStep = () => setStep(Math.min(step + 1, 5));
    const previousStep = () => setStep(Math.max(step - 1, 1));

    // ---------- LS-based values
    const [phone, _setPhone] = useState<string | null>(() => ls.phone.get() || null);
    const [profileId, _setProfileId] = useState<string | null>(() => ls.profileId.get() || null);
    const [role, _setRole] = useState<UserRole | null>(() => ls.role.get() || null);
    const [nationalIdNumber, _setNational] = useState<string | null>(
        () => ls.nationalIdNumber.get() || null,
    );

    const setPhone = (v: string | null) => {
        _setPhone(v);
        if (v) ls.phone.set(v);
        else ls.phone.remove();
    };
    const setProfileId = (v: string | null) => {
        _setProfileId(v);
        if (v) ls.profileId.set(v);
        else ls.profileId.remove();
    };
    const setRole = (v: UserRole | null) => {
        _setRole(v);
        if (v) ls.role.set(v);
        else ls.role.remove();
    };
    const setNationalIdNumber = (v: string | null) => {
        _setNational(v);
        if (v) ls.nationalIdNumber.set(v);
        else ls.nationalIdNumber.remove();
    };

    const reset = useCallback(() => {
        setPhone(null);
        setProfileId(null);
        setRole(null);
        setNationalIdNumber(null);
        setStep(1);
    }, []);

    return (
        <UserFormContext.Provider
            value={{
                phone,
                setPhone,
                profileId,
                setProfileId,
                role,
                setRole,
                nationalIdNumber,
                setNationalIdNumber,
                step,
                setStep,
                nextStep,
                previousStep,
                reset,
                isNextDisabled: step >= 5,
                isPreviousDisabled: step <= 1,
            }}
        >
            {children}
        </UserFormContext.Provider>
    );
};

export const useUserForm = (): UserFormContextProps => {
    const ctx = useContext(UserFormContext);
    if (!ctx) throw new Error('useUserForm must be used within a UserFormProvider');
    return ctx;
};
