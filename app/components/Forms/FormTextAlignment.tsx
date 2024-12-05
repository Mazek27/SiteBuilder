import * as React from 'react';
import { FC, memo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
    GrTextAlignFull,
    GrTextAlignCenter,
    GrTextAlignRight,
    GrTextAlignLeft,
} from 'react-icons/gr';

type Props = {
    id: string;
    name: string;
    label: string;
} & UseFormReturn;

export const FormTextAlignment: FC<Props> = memo(
    ({ label, name, register, setValue, watch }) => {
        const alignment = watch(name) || 'text-left';

        const options = [
            {
                value: 'text-left',
                icon: <GrTextAlignLeft className="w-6 h-6" />,
                label: 'Left',
            },
            {
                value: 'text-center',
                icon: <GrTextAlignCenter className="w-6 h-6" />,
                label: 'Center',
            },
            {
                value: 'text-right',
                icon: <GrTextAlignRight className="w-6 h-6" />,
                label: 'Right',
            },
            {
                value: 'text-justify',
                icon: <GrTextAlignFull className="w-6 h-6" />,
                label: 'Justify',
            },
        ];

        React.useEffect(() => {
            register(name);
        }, [register, name]);

        return (
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {options.map(option => (
                        <button
                            key={option.value}
                            type="button"
                            className={`p-2 border ${
                                alignment === option.value
                                    ? 'border-blue-500'
                                    : 'border-gray-300'
                            } rounded`}
                            onClick={() => setValue(name, option.value)}>
                            {option.icon}
                        </button>
                    ))}
                </div>
            </div>
        );
    },
);
