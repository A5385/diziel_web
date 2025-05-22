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

const UserForm = ({ editUser }: { editUser?: UserSchema }) => {
    // console.log('🚀 >  UserForm >  user:', user);

    return (
        <UserFormProvider>
            <RenderForms user={editUser} />
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
                {role === 'driver' && <DriverForm driverData={user?.profile?.driver} />}
                {role === 'agency' && <AgencyForm agencyData={user?.profile?.agency} />}
                {role === 'agencyAgent' && (
                    <AgencyAgentForm agentData={user?.profile?.agencyAgent} />
                )}
                {role === 'employee' && <EmployeeForm employeeData={user?.profile?.employee} />}
            </>
        );
    };
    return (
        <>
            {step === 1 && <RegisterForm userData={user} />}
            {step === 2 && <ProfileForm profileData={user?.profile} />}
            {step === 3 && <AddressForm profileData={user?.profile} />}
            {step === 4 && <NationalIdForm profileData={user?.profile} />}
            {step === 5 && renderRoleForm(user)}
        </>
    );
};
