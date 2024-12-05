import * as React from 'react';
import { FC } from 'react';
import FontToolbar from '~/components/Core/EditContainer/components/Toolbar/Bars/FontBar/FontBar';
import ContainerToolbar from '~/components/Core/EditContainer/components/Toolbar/Bars/ContainerToolbar/ContainerToolbar';

const ToolBars = {
    title: FontToolbar,
    paragraph: FontToolbar,
    container: ContainerToolbar,
};

export type ToolbarProps = {
    id: string;
    type?: string;
};

export const Toolbar: FC<ToolbarProps> = props => {
    const ToolBarComponent = ToolBars[props.type] as any;

    if (!ToolBarComponent) {
        return null;
    }

    return (
        <div className={'absolute -mt-16'}>
            <ToolBarComponent id={props.id} />
        </div>
    );
};
