import { lazy } from 'react';
import { UserFormProvider, useUserForm } from './UserFormContext';

const RegisterForm = lazy(() => import('./RegisterForm'));
const ProfileForm = lazy(() => import('./ProfileForm'));
const AddressForm = lazy(() => import('./AddressForm'));
const NationalIdForm = lazy(() => import('./NationalIdForm'));

const DriverForm = lazy(() => import('./DriverForm'));
const AgencyForm = lazy(() => import('./AgencyForm'));
const AgencyAgentForm = lazy(() => import('./AgencyAgentForm'));
const EmployeeForm = lazy(() => import('./EmployeeForm'));

const UserForm = () => {
    return (
        <UserFormProvider>
            <RenderForms />
        </UserFormProvider>
    );
};

export default UserForm;

const RenderForms = () => {
    const { step, role } = useUserForm();

    const renderRoleForm = () => {
        return (
            <>
                {role === 'driver' && <DriverForm />}
                {role === 'agency' && <AgencyForm />}
                {role === 'agencyAgent' && <AgencyAgentForm />}
                {role === 'employee' && <EmployeeForm />}
            </>
        );
    };
    return (
        <>
            {step === 1 && <RegisterForm />}
            {step === 2 && <ProfileForm />}
            {step === 3 && <AddressForm />}
            {step === 4 && <NationalIdForm />}
            {step === 5 && renderRoleForm()}
        </>
    );
};
