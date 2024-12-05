import * as React from 'react';
import { FC } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import { clsx } from 'clsx';

type Props = {
    active: boolean;
    onClick: () => void;
    icon: any;
};
export const BarButton: FC<Props> = props => {
    const Icon = props.icon;
    console.log(props.active);

    return (
        <button
            onClick={props.onClick}
            type={'button'}
            className={clsx('p-2 border border-gray-300 rounded', {
                'bg-success-800': props.active,
            })}>
            <Icon className={'w-6 h-6'} />
        </button>
    );
};
