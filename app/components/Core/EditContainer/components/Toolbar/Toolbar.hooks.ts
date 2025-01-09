import { FC, useContext, useState } from 'react';
import FontToolbar from '~/components/Core/EditContainer/components/Toolbar/Bars/FontBar/FontBar';
import ContainerToolbar from '~/components/Core/EditContainer/components/Toolbar/Bars/ContainerToolbar/ContainerToolbar';
import SelectToolToolbar from '~/components/Core/EditContainer/components/Toolbar/Bars/SelectToolToolbar/SelectToolToolbar';
import MoveToolbar from '~/components/Core/EditContainer/components/Toolbar/Bars/MoveToolbar/MoveToolbar';
import { ComponentToolbar } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import { useEditContext } from '~/hooks/useEditContext';

export type ToolbarProps = {
    id: string;
    type: string;
};

type ToolbarType = 'selectTool' | 'move' | 'text' | 'container';

export const ToolBars: Record<ToolbarType, ComponentToolbar<any>> = {
    selectTool: SelectToolToolbar,
    text: FontToolbar,
    move: MoveToolbar,
    container: ContainerToolbar,
};

export const useToolbar = (id: string, type: keyof typeof ToolBars) => {
    const [toolbarStack, setToolbarStack] = useState<(keyof typeof ToolBars)[]>(
        ['selectTool'],
    );

    const { handleUpdateClassName } = useEditContext();
    const handleChange = (
        data: { [key: string]: string | null },
        ignoreSameValue = false,
    ) => {
        handleUpdateClassName(id, data, ignoreSameValue);
    };

    const handleChangeToolbar = (newType: keyof typeof ToolBars) => {
        console.log('newType', newType);
        setToolbarStack(prevStack => [...prevStack, newType]);
    };

    const handleBackChangeToolbar = () => {
        setToolbarStack(prevStack =>
            prevStack.length > 1
                ? prevStack.slice(0, prevStack.length - 1)
                : prevStack,
        );
    };

    const currentToolbarType = toolbarStack[toolbarStack.length - 1];

    return {
        handleChange,
        currentToolbarType,
        handleChangeToolbar,
        handleBackChangeToolbar,
    };
};
