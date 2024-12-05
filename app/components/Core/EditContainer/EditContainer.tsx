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

type InnerOwnProps = {
    id?: string;
    type?: string;
};

const EditContainer: FC<PropsWithChildren<InnerOwnProps>> = props => {
    const { id, type } = props;
    const containerRef = useRef(null);
    const { element, handleSelectElement } = useEditMode();
    const displayToolBar = element === id;

    return (
        <>
            <div
                ref={containerRef}
                className={clsx(
                    'rounded-lg',
                    'hover:outline-offset-2 hover:outline-1 hover:outline select-none cursor-pointer bg-amber-100 ',
                    { 'outline outline-2 outline-cyan-500': element === id },
                )}
                onClick={handleSelectElement(id)}>
                {displayToolBar && <Toolbar type={type} id={id} />}
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

    if (isEditing && editable) {
        return (
            <EditContainer type={type} id={id}>
                {props.children}
            </EditContainer>
        );
    }

    return props.children;
};
