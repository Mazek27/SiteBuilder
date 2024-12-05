import {
    ComponentToolbar,
    ToolbarProps,
} from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
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
import { BarButton } from '~/components/Core/EditContainer/components/Toolbar/components/BarButton';

type Props = ComponentToolbar<{}>;

const ContainerToolbar: React.FC<Props> = ({ handleChange }) => {
    return (
        <div className="absolute top-0 grid grid-flow-col w-auto gap-2 p-2 bg-gray-100 border-b border-gray-300 divide-x">
            {/* Grid Display */}
            <div className="grid grid-flow-col gap-2">
                <BarButton
                    active={false}
                    onClick={() =>
                        handleChange(
                            {
                                display: 'grid',
                                gridColumn: null,
                                gridAutoFlow: 'grid-flow-row',
                            },
                            true,
                        )
                    }
                    icon={BiDotsVertical}
                />
                <BarButton
                    active={false}
                    onClick={() =>
                        handleChange(
                            {
                                display: 'grid',
                                gridRow: null,
                                gridAutoFlow: 'grid-flow-col',
                            },
                            true,
                        )
                    }
                    icon={BiDotsHorizontal}
                />
            </div>
            <div className="grid grid-flow-col gap-2 pl-2">
                {/* Justify Items */}
                <BarButton
                    active={false}
                    onClick={() =>
                        handleChange({ justifyItems: 'justify-items-start' })
                    }
                    icon={BiObjectsHorizontalLeft}
                />
                <BarButton
                    active={false}
                    onClick={() =>
                        handleChange({ justifyItems: 'justify-items-center' })
                    }
                    icon={BiObjectsHorizontalCenter}
                />
                <BarButton
                    active={false}
                    onClick={() =>
                        handleChange({ justifyItems: 'justify-items-end' })
                    }
                    icon={BiObjectsHorizontalRight}
                />
            </div>
            <div className="grid grid-flow-col gap-2 pl-2">
                {/* Align Items */}
                <BarButton
                    active={true}
                    onClick={() => handleChange({ alignItems: 'items-start' })}
                    icon={BiObjectsVerticalTop}
                />
                <BarButton
                    active={false}
                    onClick={() => handleChange({ alignItems: 'items-center' })}
                    icon={BiObjectsVerticalCenter}
                />
                <BarButton
                    active={false}
                    onClick={() => handleChange({ alignItems: 'items-end' })}
                    icon={BiObjectsVerticalBottom}
                />
            </div>
        </div>
    );
};

export default ContainerToolbar;
