import { useSearchParams } from '@remix-run/react';
import { MouseEvent, useCallback, useContext } from 'react';
import { EditContext } from '~/components/Layout/LayoutGuard';

export const useEditMode = () => {
    const {} = useContext(EditContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOpen = useCallback(() => {
        console.log('handleOpen');
        setSearchParams(prev => {
            prev.set('edit', 'true');
            return prev;
        });
    }, []);

    const handleClose = useCallback(() => {
        setSearchParams(prev => {
            prev.delete('edit');
            prev.delete('element');
            return prev;
        });
    }, [setSearchParams]);

    const handleSelectElement = useCallback(
        (id: string) => (event: MouseEvent) => {
            event?.stopPropagation?.();
            setSearchParams(prev => {
                prev.set('element', id);
                return prev;
            });
        },
        [setSearchParams],
    );

    const handleDeselectElement = useCallback(() => {
        setSearchParams(prev => {
            prev.delete('element');
            return prev;
        });
    }, []);

    return {
        isEditing: searchParams.get('edit') || false,
        element: searchParams.get('element'),
        handleOpen,
        handleClose,
        handleSelectElement,
        handleDeselectElement,
    };
};
