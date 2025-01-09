import { ComponentToolbar } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import * as React from 'react';
import { BsFonts, BsArrowsMove } from 'react-icons/bs';
import { BarButton } from '~/components/Core/EditContainer/components/Toolbar/components/BarButton';

type Props = ComponentToolbar<{}>;

const SelectToolToolbar: React.FC<Props> = ({ handleChangeToolbar }) => {
    return (
        <div className="absolute top-0 grid grid-flow-col w-auto gap-2 p-2 bg-gray-100 border-b border-gray-300 divide-x">
            {/* Grid Display */}
            <div className="grid grid-flow-col gap-2">
                <BarButton
                    active={false}
                    onClick={() => handleChangeToolbar('move')}
                    icon={BsArrowsMove}
                />
                <BarButton
                    active={false}
                    onClick={() => handleChangeToolbar('text')}
                    icon={BsFonts}
                />
            </div>
        </div>
    );
};

export default SelectToolToolbar;
