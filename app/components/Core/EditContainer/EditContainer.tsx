import { FC, PropsWithChildren, useRef } from 'react';
import { clsx } from 'clsx';
import { useEditMode } from '~/hooks/useEditMode';
import { Toolbar } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import { useEditContext } from '~/hooks/useEditContext';
import { ResizeHandlers } from '~/components/Core/EditContainer/components/ResizeHandlers/ResizeHandlers';

type InnerOwnProps = {
    id: string;
    type?: string;
};

const EditContainer: FC<PropsWithChildren<InnerOwnProps>> = props => {
    const { id, type } = props;
    const toolbarRef = useRef(null);
    const { getComponentClassNames, mode } = useEditContext();
    const { element, handleSelectElement, handleDeselectElement } =
        useEditMode();
    const displayTools = element === id;
    const displayMove = mode === 'move';

    useOutsideClick(toolbarRef, () => {
        if (element) {
            handleDeselectElement();
        }
    });

    const { gridRowStart, gridRowEnd, gridColStart, gridColEnd } =
        getComponentClassNames(id);

    return (
        <>
            <div
                className={clsx(
                    'grid',
                    'grid-cols-1',
                    'grid-rows-1',
                    gridRowStart,
                    gridRowEnd,
                    gridColStart,
                    gridColEnd,
                    'rounded-lg relative',
                    'hover:outline-offset-8 hover:z-50 hover:outline-5 outline-blue-500 hover:outline select-none cursor-pointer bg-amber-100 ',
                    {
                        'outline outline-offset-8 outline-5 outline-blue-700 z-50 ':
                            element === id,
                    },
                )}
                onClick={handleSelectElement(id)}>
                {props.children}
                {displayTools && (
                    <>
                        {displayMove && <ResizeHandlers />}
                        {!displayMove && (
                            <Toolbar
                                type={type as any}
                                ref={toolbarRef}
                                id={id}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
};

type OuterOwnProps = {
    id?: string;
    type?: string;
    editable?: boolean;
    defaultValues?: Record<string, any>;
};

export default (props: PropsWithChildren<OuterOwnProps>) => {
    const { editable = true, type, id } = props;
    const { isEditing } = useEditMode();

    if (isEditing && editable && id) {
        return (
            <EditContainer type={type} id={id}>
                {props.children}
            </EditContainer>
        );
    }

    return props.children;
};
