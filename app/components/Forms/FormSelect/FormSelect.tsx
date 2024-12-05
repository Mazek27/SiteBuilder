import * as React from 'react';
import { FC, SelectHTMLAttributes } from 'react';

type Props = {
    label: string;
    options: any;
    optionRenderer: (option: any) => React.ReactNode;
} & SelectHTMLAttributes<any>;

export const FormSelect: FC<Props> = ({ label, ...props }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                {...props}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500">
                <option value="">None</option>
                {props.options.map(props.optionRenderer)}
            </select>
        </div>
    );
};
