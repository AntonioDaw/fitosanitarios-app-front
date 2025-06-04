'use client';

import { FC, useActionState } from 'react';
import CreateCultivoForm, {
  CreateFormState,
  TipoCultivoField,
} from './CreateCultivoForm';

type CultivoFormWrapperProps = {
  tipos: TipoCultivoField[];
  action: (formData: FormData, id?:string ) => Promise<CreateFormState>;
  initialValues?: {
    nombre: string;
    tipo_id: number | string;
    
  };
};

const CultivoFormWrapper: FC<CultivoFormWrapperProps> = ({
  tipos,
  action,
  initialValues,
}) => {
  const initialState: CreateFormState = {
    errors: {},
    message: null,
  };

  const adaptedAction = async (
    _prevState: CreateFormState,
    formData: FormData
  ): Promise<CreateFormState> => {
    return await action(formData);
  };

  const [state, formAction] = useActionState(adaptedAction, initialState);

  return (
    <CreateCultivoForm
      tipos={tipos}
      action={formAction}
      state={state}
      initialValues={initialValues}
    />
  );
};

export default CultivoFormWrapper;
