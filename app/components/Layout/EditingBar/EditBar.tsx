import * as React from 'react';
import { FC } from 'react';
import { EditModeButton } from '~/components/Layout/Header/components/EditModeButton/EditModeButton';
import { useEditContext } from '~/hooks/useEditContext';

type Props = {};
const EditBar: FC<Props> = props => {
    const { handleCancel, handleSave } = useEditContext();

    return (
        <div className="w-full bg-amber-200 py-2 px-4 flex flex-row gap-4 justify-end shadow-md z-40">
            <EditModeButton
                isEditing={true}
                onSave={handleSave}
                onCloseEditMode={handleCancel}
            />
        </div>
    );
};

export default EditBar;
