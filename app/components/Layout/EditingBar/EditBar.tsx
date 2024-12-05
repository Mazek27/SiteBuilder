import * as React from 'react';
import { FC, useContext } from 'react';
import { EditContext } from '~/components/Layout/LayoutGuard';
import { EditModeButton } from '~/components/Layout/Header/components/EditModeButton/EditModeButton';

type Props = {};
const EditBar: FC<Props> = props => {
    const { handleCancel, handleSave } = useContext(EditContext);

    return (
        <div className="w-full bg-amber-200 py-2 px-4 flex flex-row gap-4 justify-end shadow-md z-50">
            <EditModeButton
                isEditing={true}
                onSave={handleSave}
                onCloseEditMode={handleCancel}
            />
        </div>
    );
};

export default EditBar;
