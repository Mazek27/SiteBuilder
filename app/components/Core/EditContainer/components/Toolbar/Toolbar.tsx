import * as React from 'react';
import { FC, forwardRef, useContext } from 'react';
import FontToolbar from '~/components/Core/EditContainer/components/Toolbar/Bars/FontBar/FontBar';
import ContainerToolbar from '~/components/Core/EditContainer/components/Toolbar/Bars/ContainerToolbar/ContainerToolbar';
import { EditContext } from '~/components/Layout/LayoutGuard';

const ToolBars = {
    title: FontToolbar,
    paragraph: FontToolbar,
    container: ContainerToolbar,
};

export type ToolbarProps = {
    id: string;
    type: keyof typeof ToolBars;
};

export type ComponentToolbar<T> = T &
    ToolbarProps & {
        handleChange: (
            data: { [key: string]: string | null },
            ignoreSameValue?: boolean,
        ) => void;
    };

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
    (props, ref) => {
        const { handleUpdateClassName } = useContext(EditContext);
        const handleChange = (
            data: { [key: string]: string | null },
            ignoreSameValue = false,
        ) => {
            handleUpdateClassName(props.id, data, ignoreSameValue);
        };

        const ToolBarComponent = ToolBars[props.type] as any;

        if (!ToolBarComponent) {
            return null;
        }

        return (
            <div className={'absolute -translate-y-20'} ref={ref}>
                <ToolBarComponent
                    key={props.id}
                    id={props.id}
                    handleChange={handleChange}
                />
            </div>
        );
    },
);
