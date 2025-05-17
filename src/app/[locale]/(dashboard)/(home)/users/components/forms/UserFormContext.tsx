'use client';
import { UserRole } from '@/types/prisma';
import React, { createContext, Dispatch, ReactNode, useCallback, useState } from 'react';

export type UserFormContextProps = {
    phone: string | null;
    setPhone: Dispatch<React.SetStateAction<string | null>>;
    /////
    profileId: string | null;
    setProfileId: Dispatch<React.SetStateAction<string | null>>;
    /////
    nationalIdNumber: string | null;
    setNationalIdNumber: Dispatch<React.SetStateAction<string | null>>;
    /////
    role: UserRole | null;
    setRole: Dispatch<React.SetStateAction<UserRole | null>>;
    /////
    step: number | null;
    setStep: Dispatch<React.SetStateAction<number>>;
    reset: () => void;
    nextStep: () => void;
    previousStep: () => void;
    isNextDisabled: boolean;
    isPreviousDisabled: boolean;
};
const UserFormContext = createContext<UserFormContextProps | null>(null);

const UserFormProvider = ({ children }: { children: ReactNode }) => {
    const [phone, setPhone] = useState<string | null>(null);
    const [profileId, setProfileId] = useState<string | null>(null);
    const [role, setRole] = useState<UserRole | null>(null);
    const [nationalIdNumber, setNationalIdNumber] = useState<string | null>(null);
    const [step, setStep] = useState(1);

    const reset = useCallback(() => {
        setPhone(null);
        setProfileId(null);
        setRole(null);
        setNationalIdNumber(null);
        setStep(1);
    }, []);

    const nextStep = () => {
        setStep(step + 1);
    };
    const previousStep = () => {
        setStep(step - 1);
    };

    return (
        <UserFormContext.Provider
            value={{
                phone,
                setPhone,
                role,
                setRole,
                nationalIdNumber,
                setNationalIdNumber,
                step,
                setStep,
                profileId,
                setProfileId,
                reset,
                nextStep,
                previousStep,
                isNextDisabled: step === 5,
                isPreviousDisabled: step === 1,
            }}
        >
            {children}
        </UserFormContext.Provider>
    );
};

const useUserForm = (): UserFormContextProps => {
    const context = React.useContext(UserFormContext);
    if (!context) {
        throw new Error('useUserForm must be used within a UserFormProvider');
    }
    return context;
};

export { UserFormProvider, useUserForm };
