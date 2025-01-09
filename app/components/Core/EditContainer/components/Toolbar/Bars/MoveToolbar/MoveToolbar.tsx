import { ComponentToolbar } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import * as React from 'react';
import { BiDotsVertical, BiDotsHorizontal } from 'react-icons/bi';
import { BarButton } from '~/components/Core/EditContainer/components/Toolbar/components/BarButton';
import { CoreToolbar } from '~/components/Core/EditContainer/components/Toolbar/components/CoreToolbar';
import { useEffect } from 'react';
import { useEditMode } from '~/hooks/useEditMode';
import { useEditContext } from '~/hooks/useEditContext';

type Props = ComponentToolbar<{}>;

const MoveToolbar: React.FC<Props> = ({ id, type, ...methods }) => {
    const { handleChange } = methods;
    const { handleChangeMode } = useEditContext();

    useEffect(() => {
        handleChangeMode('move');

        console.log('init');
        return () => {
            console.log('cleanup');
            handleChangeMode('edit');
        };
    }, []);

    return (
        <CoreToolbar id={id} type={type} {...methods}>
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
        </CoreToolbar>
    );
};

export default MoveToolbar;
