import { FC, InputHTMLAttributes, memo, useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = {
    name: string;
    label: string;
} & InputHTMLAttributes<any> &
    UseFormReturn;

export const FormInput: FC<Props> = memo(
    ({ label, name, register, getValues, setValue, ...rest }) => {
        const field = register(name);
        const initialVal = useRef(rest.formState.defaultValues?.[name] || '');

        useEffect(() => {
            setValue(name, rest.formState.defaultValues?.[name]);
        }, [rest.formState.defaultValues]);

        return (
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                <input
                    {...field}
                    defaultValue={initialVal.current}
                    id={name}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
                />
            </div>
        );
    },
);
