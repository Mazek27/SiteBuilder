import { ToolbarProps } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import * as React from 'react';
import {
    BiObjectsHorizontalCenter,
    BiObjectsHorizontalLeft,
    BiObjectsHorizontalRight,
    BiObjectsVerticalTop,
    BiObjectsVerticalCenter,
    BiObjectsVerticalBottom,
    BiDotsVertical,
    BiDotsHorizontal,
} from 'react-icons/bi';
import { useContext } from 'react';
import { EditContext } from '~/components/Layout/LayoutGuard';

type Props = ToolbarProps;

const ContainerToolbar: React.FC<Props> = ({ id }) => {
    const { handleUpdateClassName } = useContext(EditContext);
    const handleChange = (
        property: string | string[],
        value: string | string[],
        ignoreSameValue = false,
    ) => {
        handleUpdateClassName(id, property, value, ignoreSameValue);
    };

    return (
        <div className="flex flex-wrap items-center p-2 bg-gray-100 border-b border-gray-300">
            {/* Direction */}
            <button
                onClick={() =>
                    handleChange(
                        ['display', 'flexDirection'],
                        ['flex', 'flex-col'],
                        true,
                    )
                }
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <BiDotsVertical className={'w-6 h-6'} />
            </button>
            <button
                onClick={() =>
                    handleChange(
                        ['display', 'flexDirection'],
                        ['flex', 'flex-row'],
                        true,
                    )
                }
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <BiDotsHorizontal className={'w-6 h-6'} />
            </button>

            {/* Justify */}

            <button
                onClick={() => handleChange('justifyContent', 'justify-start')}
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <BiObjectsHorizontalLeft className={'w-6 h-6'} />
            </button>

            <button
                onClick={() => handleChange('justifyContent', 'justify-center')}
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <BiObjectsHorizontalCenter className={'w-6 h-6'} />
            </button>

            <button
                onClick={() => handleChange('justifyContent', 'justify-end')}
                className="p-2 border border-gray-300 rounded mr-2 hover:bg-gray-200">
                <BiObjectsHorizontalRight className={'w-6 h-6'} />
            </button>

            {/* Vertical Align Top */}
            <button
                onClick={() => handleChange('alignItems', 'items-start')}
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <BiObjectsVerticalTop className={'w-6 h-6'} />
            </button>

            {/* Vertical Align Center */}
            <button
                onClick={() => handleChange('alignItems', 'items-center')}
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <BiObjectsVerticalCenter className={'w-6 h-6'} />
            </button>

            {/* Vertical Align Bottom */}
            <button
                onClick={() => handleChange('alignItems', 'items-end')}
                className="p-2 border border-gray-300 rounded mr-2 hover:bg-gray-200">
                <BiObjectsVerticalBottom className={'w-6 h-6'} />
            </button>
        </div>
    );
};

export default ContainerToolbar;
