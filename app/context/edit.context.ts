import {
    createContext,
    CSSProperties,
    MouseEvent,
    useCallback,
    useContext,
} from 'react';
import { SettingsType } from '~/components/Core/model';
import { useSearchParams } from '@remix-run/react';
import { patterns } from '~/utils/client/TailwindCssParser';
import { AppModeType } from '~/models/AppMode';
import { StyleUpdates } from '~/models/Style';

export type EditContextType = {
    mode: AppModeType;
    handleChangeMode: (mode: AppModeType) => void;
    handleUpdateComponent: (id: string, data: any) => void;
    getComponentSettings: (id: string) => SettingsType<any>;
    getComponentClassNames: (
        id: string,
    ) => Record<keyof typeof patterns, string>;
    getComponentStyles: (id: string) => CSSProperties;
    handleUpdateStyle: (
        id: string,
        styles: CSSProperties,
        merge?: boolean,
    ) => void;
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
    handleUpdateStyle: (id: string, styles: CSSProperties, merge = true) => {},
    getComponentSettings: (id: string) => ({}) as SettingsType<any>,
    getComponentClassNames: (id: string) =>
        ({}) as Record<keyof typeof patterns, string>,
    getComponentStyles: (id: string) => ({}) as CSSProperties,
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
