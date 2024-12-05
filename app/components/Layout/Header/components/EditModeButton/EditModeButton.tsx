import * as React from 'react';
import { FC, useContext } from 'react';
import { TextButton } from '~/components/Core/TextButton/TextButton';
import { clsx } from 'clsx';
import { User } from '~/components/Layout/Header/components/User';
import { UseRoleProps } from '@floating-ui/react';
import { Auth0Profile } from 'remix-auth-auth0';
import { useEditMode } from '~/hooks/useEditMode';
import { EditContext } from '~/components/Layout/LayoutGuard';

type Props = {
    isEditing: boolean;
};
export const EditModeButton: FC<Props> = props => {
    const { handleOpen, handleClose } = useEditMode();
    const { handleSave } = useContext(EditContext);

    if (props.isEditing) {
        return (
            <>
                <TextButton
                    editable={false}
                    settings={{
                        text: 'Cancel',
                        className:
                            'bg-red-700 py-1 px-4 rounded-lg text-white pointer',
                    }}
                    onClick={handleClose}
                />
                <TextButton
                    editable={false}
                    settings={{
                        text: 'Save',
                        className:
                            'bg-green-700 py-1 px-4 rounded-lg text-white pointer',
                    }}
                    onClick={handleSave}
                />
            </>
        );
    }

    return (
        <>
            <TextButton
                editable={false}
                settings={{
                    className: clsx('cursor-pointer', {
                        'underline underline-offset-8': props.isEditing,
                    }),
                    text: 'Edit Mode',
                }}
                onClick={handleOpen}
            />
        </>
    );
};
