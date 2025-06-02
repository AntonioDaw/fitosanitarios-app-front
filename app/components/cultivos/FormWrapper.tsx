'use client';

import { FC, useActionState } from 'react';
import CreateCultivoForm, {
    CreateFormState,
    TipoCultivoField,
} from './CreateCultivoForm';
import { createCultivo } from '@/app/helpers/action';

const FormWrapper: FC<{ tipos: TipoCultivoField[] }> = ({ tipos }) => {
    const initialState: CreateFormState = {
        errors: {},
        message: null,
    };

    const [state, formAction] = useActionState<CreateFormState, FormData>(
        createCultivo,
        initialState
    );

    return (
        <div>
            <CreateCultivoForm tipos={tipos} action={formAction} state={state} />
        </div>
    );
};

export default FormWrapper;