import { useContext } from 'react';
import { EditContext } from '~/context/edit.context';

export const useEditContext = () => {
    const context = useContext(EditContext);

    return context;
};
