import * as React from 'react';
import { FC, forwardRef, useContext } from 'react';
import {
    ToolbarProps,
    ToolBars,
    useToolbar,
} from '~/components/Core/EditContainer/components/Toolbar/Toolbar.hooks';

export type ComponentToolbar<T> = T &
    ToolbarProps & {
        handleChange: (
            data: { [key: string]: string | null },
            ignoreSameValue?: boolean,
        ) => void;
        handleChangeToolbar: (newType: keyof typeof ToolBars) => void;
        handleBackChangeToolbar: () => void;
    };

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
    (props, ref) => {
        const {
            currentToolbarType,
            handleChange,
            handleChangeToolbar,
            handleBackChangeToolbar,
        } = useToolbar(props.id, props.type as any);

        const ToolBarComponent = ToolBars[currentToolbarType] as any;

        if (!ToolBarComponent) {
            return null;
        }

        return (
            <div className={'absolute -translate-y-20'} ref={ref}>
                <ToolBarComponent
                    key={props.id}
                    id={props.id}
                    handleChangeToolbar={handleChangeToolbar}
                    handleBackChangeToolbar={handleBackChangeToolbar}
                    handleChange={handleChange}
                />
            </div>
        );
    },
);
