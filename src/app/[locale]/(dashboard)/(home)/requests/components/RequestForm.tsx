import { CreateRequest, UpdateRequest } from '@/api-service/data-service/RequestService';
import { AKForm } from '@/components/my-components/form/AKForm';
import { AKFormInput } from '@/components/my-components/form/AKFormInput';
import SubmitButton from '@/components/my-components/form/SubmitButton';
import GridWrapper from '@/components/my-components/GridWrapper';
import AppConfig from '@/constants/AppSettings';
import { PaymentOptionsList, TransportTypeList, UnitTypeList } from '@/constants/enum-list';
import useZod from '@/hooks/useZod';
import { useDialog } from '@/providers/DialogProvider';
import { RequestSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type RequestFormProps = {
    editRequest?: RequestSchema;
};

const RequestForm = ({ editRequest }: RequestFormProps) => {
    const t = useTranslations();
    const schema = useZod().schemas.requestSchema;
    const { handleCloseDialog, dialogType, editItemId } = useDialog();

    const updateForm = dialogType === 'edit-request' && editRequest && editItemId;

    type FormType = z.infer<typeof schema>;

    const form = useForm<FormType>({
        mode: AppConfig.form.mode,
        resolver: zodResolver(schema),
        defaultValues: {
            carType: editRequest?.carType ?? '',
            cargoType: editRequest?.cargoType ?? '',
            unitType: editRequest?.unitType ?? 'shipment',
            unitCount: editRequest?.unitCount ?? 1,
            pickupLocation: editRequest?.pickupLocation ?? '',
            dropoffLocation: editRequest?.carType ?? '',
            distanceKM: editRequest?.distanceKM ?? 0,
            priceEstimate: editRequest?.priceEstimate ?? 0,
            transportType: editRequest?.transportType ?? 'inclusive',
            paymentOption: editRequest?.paymentOption ?? 'cash',
            advancePayment: editRequest?.advancePayment ?? 0,
            notes: editRequest?.notes ?? '',
        },
    });

    const createRequest = CreateRequest();
    const updateRequest = UpdateRequest();

    const submit: SubmitHandler<FormType> = async (data) => {
        let res: RequestSchema | null = null;

        if (updateForm) {
            if (editItemId) res = await updateRequest.mutateAsync({ data, id: editItemId });
        } else {
            res = await createRequest.mutateAsync({ data });
        }
        if (res) {
            form.reset();
            handleCloseDialog();
        }
    };

    return (
        <AKForm
            form={form}
            submit={submit}
            title={updateForm ? 'edit-request' : 'new-request'}
            formButtons={
                <SubmitButton form={form} title={updateForm ? 'update' : 'create'} fullWidth />
            }
        >
            <GridWrapper cols={3} className='col-span-2' title='general-info'>
                <AKFormInput
                    form={form}
                    inputType='input'
                    name='carType'
                    label={t('car-type')}
                    placeholder={t('car-type-ph')}
                    required
                />
                <AKFormInput
                    form={form}
                    inputType='input'
                    name='cargoType'
                    label={t('cargo-type')}
                    placeholder={t('cargo-type-ph')}
                    required
                />
                <AKFormInput
                    form={form}
                    inputType='select'
                    name='unitType'
                    label={t('unit-type')}
                    selectItems={UnitTypeList.map((unit) => ({
                        label: t(unit),
                        value: unit,
                    }))}
                    required
                />
                <AKFormInput
                    form={form}
                    inputType='input'
                    type='number'
                    name='unitCount'
                    label={t('unit-count')}
                    required
                />
                <AKFormInput
                    form={form}
                    inputType='select'
                    name='transportType'
                    label={t('transport-type')}
                    selectItems={TransportTypeList.map((transport) => ({
                        label: t(transport),
                        value: transport,
                    }))}
                />
            </GridWrapper>
            <GridWrapper cols={3} className='col-span-2' title='location-info'>
                <AKFormInput
                    form={form}
                    inputType='text-area'
                    name='pickupLocation'
                    label={t('pickup-location')}
                    placeholder={t('pickup-location-ph')}
                    required
                />
                <AKFormInput
                    form={form}
                    inputType='text-area'
                    name='dropoffLocation'
                    label={t('drop-off-location')}
                    placeholder={t('drop-off-location-ph')}
                    required
                />
                <AKFormInput
                    form={form}
                    inputType='input'
                    type='number'
                    name='distanceKM'
                    label={t('distance-km')}
                />
            </GridWrapper>
            <GridWrapper cols={3} className='col-span-2' title='payment-info'>
                <AKFormInput
                    form={form}
                    inputType='select'
                    name='paymentOption'
                    label={t('payment-option')}
                    selectItems={PaymentOptionsList.map((payment) => ({
                        label: t(payment),
                        value: payment,
                    }))}
                />
                <AKFormInput
                    form={form}
                    inputType='input'
                    type='number'
                    name='priceEstimate'
                    label={t('price-estimate')}
                />
                <AKFormInput
                    form={form}
                    inputType='input'
                    type='number'
                    name='advancePayment'
                    label={t('advance-payment')}
                />
            </GridWrapper>
            <AKFormInput
                form={form}
                inputType='text-area'
                name='notes'
                label={t('notes')}
                placeholder={t('notes-ph')}
            />
        </AKForm>
    );
};

export default RequestForm;
