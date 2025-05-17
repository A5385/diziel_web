'use client';
import { UserSchema } from '@/types/schema';
import { lazy } from 'react';
import { UserFormProvider, useUserForm } from './UserFormContext';

const RegisterForm = lazy(() => import('./RegisterForm'));
const ProfileForm = lazy(() => import('./ProfileForm'));
const AddressForm = lazy(() => import('./AddressForm'));
const NationalIdForm = lazy(() => import('./NationalIdForm'));

const DriverForm = lazy(() => import('./driver-form/DriverForm'));
const AgencyForm = lazy(() => import('./AgencyForm'));
const AgencyAgentForm = lazy(() => import('./AgencyAgentForm'));
const EmployeeForm = lazy(() => import('./EmployeeForm'));

const UserForm = ({ user }: { user?: UserSchema }) => {
    // console.log('🚀 >  UserForm >  user:', user);

    return (
        <UserFormProvider>
            <RenderForms user={user} />
        </UserFormProvider>
    );
};

export default UserForm;

const RenderForms = ({ user }: { user?: UserSchema }) => {
    const { step, role: contextRole } = useUserForm();
    const role = user ? user?.role : contextRole;

    const renderRoleForm = (user?: UserSchema) => {
        return (
            <>
                {role === 'driver' && <DriverForm data={user?.profile?.driver} />}
                {role === 'agency' && <AgencyForm data={user?.profile?.agency} />}
                {role === 'agencyAgent' && <AgencyAgentForm data={user?.profile?.agencyAgent} />}
                {role === 'employee' && <EmployeeForm data={user?.profile?.employee} />}
            </>
        );
    };
    return (
        <>
            {step === 1 && <RegisterForm data={user} />}
            {step === 2 && <ProfileForm data={user?.profile} />}
            {step === 3 && <AddressForm data={user?.profile?.address} />}
            {step === 4 && <NationalIdForm data={user?.profile?.national} />}
            {step === 5 && renderRoleForm(user)}
        </>
    );
};
