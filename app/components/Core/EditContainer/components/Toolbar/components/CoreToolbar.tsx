import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import { ComponentToolbar } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import { BarButton } from '~/components/Core/EditContainer/components/Toolbar/components/BarButton';
import { BiArrowBack } from 'react-icons/bi';

type Props<T> = ComponentToolbar<T>;

export const CoreToolbar = (props: PropsWithChildren<Props<unknown>>) => {
    const { handleBackChangeToolbar } = props;

    return (
        <div className="flex flex-wrap items-center p-2 gap-2 bg-gray-100 border-b border-gray-300">
            <BarButton
                active={false}
                onClick={handleBackChangeToolbar}
                icon={BiArrowBack}
            />
            {props.children}
        </div>
    );
};
