'use client';
import { dynamicOptions } from '@/helpers/DynamicImport';
import { UserSchema } from '@/types/schema';
import dynamic from 'next/dynamic';
import { UserFormProvider, useUserForm } from './UserFormContext';

const RegisterForm = dynamic(() => import('./RegisterForm'), {
    ...dynamicOptions,
});
const ProfileForm = dynamic(() => import('./ProfileForm'), {
    ...dynamicOptions,
});
const AddressForm = dynamic(() => import('./AddressForm'), {
    ...dynamicOptions,
});
const NationalIdForm = dynamic(() => import('./NationalIdForm'), {
    ...dynamicOptions,
});

const DriverForm = dynamic(() => import('./driver-form/DriverForm'), {
    ...dynamicOptions,
});
const AgencyForm = dynamic(() => import('./AgencyForm'), {
    ...dynamicOptions,
});
const AgencyAgentForm = dynamic(() => import('./AgencyAgentForm'), {
    ...dynamicOptions,
});
const EmployeeForm = dynamic(() => import('./EmployeeForm'), {
    ...dynamicOptions,
});

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
