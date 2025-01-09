import { createContext, MouseEvent, useCallback, useContext } from 'react';
import { SettingsType } from '~/components/Core/model';
import { useSearchParams } from '@remix-run/react';
import { patterns } from '~/utils/client/TailwindCssParser';
import { AppModeType } from '~/models/AppMode';

export type EditContextType = {
    mode: AppModeType;
    handleChangeMode: (mode: AppModeType) => void;
    handleUpdateComponent: (id: string, data: any) => void;
    getComponentSettings: (id: string) => SettingsType<any>;
    getComponentClassNames: (
        id: string,
    ) => Record<keyof typeof patterns, string>;
    handleUpdateSettings: (id: string, property: string, data: any) => void;
    handleUpdateClassName: (
        id: string,
        data: {
            [x: string]: string | null;
        },
        ignoreSameValue?: boolean,
    ) => void;
    handleSave: () => void;
    handleClose: () => void;
    handleCancel: () => void;
};

export const EditContext = createContext<EditContextType>({
    mode: 'edit',
    handleChangeMode: (mode: AppModeType) => {},
    handleUpdateComponent: (id: string, data: any) => {},
    getComponentSettings: (id: string) => ({}) as SettingsType<any>,
    getComponentClassNames: (id: string) =>
        ({}) as Record<keyof typeof patterns, string>,
    handleUpdateSettings: (id: string, property: string, data: any) => {},
    handleUpdateClassName: (
        id: string,
        data: {
            [x: string]: string | null;
        },
        ignoreSameValue?: boolean,
    ) => {},
    handleSave: () => {},
    handleClose: () => {},
    handleCancel: () => {},
});
