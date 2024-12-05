import {
    FC,
    PropsWithChildren,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { EditContext } from '~/components/Layout/LayoutGuard';
import { clsx } from 'clsx';
import { SettingsType } from '~/components/Core/model';
import { useSearchParams } from '@remix-run/react';
import { useEditMode } from '~/hooks/useEditMode';
import { Toolbar } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import { useOutsideClick } from '~/hooks/useOutsideClick';

type InnerOwnProps = {
    id: string;
    type?: string;
};

const EditContainer: FC<PropsWithChildren<InnerOwnProps>> = props => {
    const { id, type } = props;
    const toolbarRef = useRef(null);
    const { element, handleSelectElement, handleDeselectElement } =
        useEditMode();
    const displayToolBar = element === id;

    useOutsideClick(toolbarRef, () => {
        if (element) {
            handleDeselectElement();
        }
    });

    return (
        <>
            <div
                className={clsx(
                    'rounded-lg relative',
                    'hover:outline-offset-8 hover:z-50 hover:outline-5 outline-blue-500 hover:outline select-none cursor-pointer bg-amber-100 ',
                    {
                        'outline outline-offset-8 outline-5 outline-blue-700 z-50 ':
                            element === id,
                    },
                )}
                onClick={handleSelectElement(id)}>
                {displayToolBar && (
                    <Toolbar type={type as any} ref={toolbarRef} id={id} />
                )}
                {props.children}
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
