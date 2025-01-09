import * as React from 'react';
import { FC } from 'react';
import { useEditContext } from '~/hooks/useEditContext';

type Props = {};
export const ResizeHandlers: FC<Props> = props => {
    const {} = useEditContext();

    return (
        <>
            <div className="absolute top-0 left-0 h-100 w-100 border border-solid border-red-500 " />
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500" />
        </>
    );
};
