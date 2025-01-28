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
    const elementRef = useRef(null);
    const { mode, getComponentStyles, getComponentSettings } = useEditContext();
    const { element, handleSelectElement, handleDeselectElement } =
        useEditMode();
    const displayTools = element === id;
    const displayMove = mode === 'move';

    // useOutsideClick(toolbarRef, () => {
    //     if (element) {
    //         handleDeselectElement();
    //     }
    // });

    const settings = getComponentSettings(id);
    const style = getComponentStyles(id);

    return (
        <>
            <div
                className={clsx(
                    'absolute',
                    'rounded-lg relative',
                    'hover:outline-offset-7 hover:outline-4 outline-blue-400 hover:outline select-none cursor-pointer bg-amber-100 ',
                    {
                        'outline outline-offset-7 outline-4 outline-blue-700 z-40  hover:z-40':
                            element === id,
                    },
                )}
                style={style}
                ref={elementRef}
                onClick={handleSelectElement(id)}>
                {props.children}
                {displayTools && (
                    <>
                        {!settings.locked && (
                            <ResizeHandlers id={id} elementRef={elementRef} />
                        )}
                        <Toolbar type={type as any} ref={toolbarRef} id={id} />
                    </>
                )}
            </div>
        </>
    );
};

type OuterOwnProps = {
    id?: string;
    type?: string;
    locked?: boolean;
    defaultValues?: Record<string, any>;
};

export default (props: PropsWithChildren<OuterOwnProps>) => {
    const { locked = false, type, id } = props;
    const { isEditing } = useEditMode();

    if (isEditing && !locked && id) {
        return (
            <EditContainer type={type} id={id}>
                {props.children}
            </EditContainer>
        );
    }

    return props.children;
};
