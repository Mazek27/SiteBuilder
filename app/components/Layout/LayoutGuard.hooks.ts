import React, { useCallback, useEffect, useState } from 'react';
import { SettingsType } from '~/components/Core/model';
import _ from 'lodash';
import {
    changeClassInString,
    convertStringToPropertyClass,
    updateClassName,
} from '~/utils/client/className';
import { useFetcher } from '@remix-run/react';
import { useEditMode } from '~/hooks/useEditMode';
import {
    composeComponentPath,
    getSettingsById,
} from '~/utils/client/component';

export const useLayoutGuard = <T extends object>(
    baseSettings: SettingsType<T>,
) => {
    const { isEditing, ...methods } = useEditMode();
    const fetcher = useFetcher<{ success: boolean }>();
    const [layoutSettings, updateSettings] =
        useState<SettingsType<T>>(baseSettings);

    const layoutBaseRef = React.useRef<SettingsType<T>>(baseSettings);

    const handleCancel = useCallback(() => {
        updateSettings(layoutBaseRef.current);
    }, []);

    const handleClose = useCallback(() => {
        handleCancel();
        methods.handleClose();
    }, [methods.handleClose, handleCancel]);

    const handleSave = useCallback(() => {
        fetcher.submit(
            {
                actionType: 'saveSettings',
                settings: JSON.stringify(layoutSettings),
            },
            { method: 'POST' },
        );
    }, [layoutSettings]);

    useEffect(() => {
        if (fetcher.data?.success) {
            methods.handleClose();
        }
    }, [fetcher]);

    const handleUpdate = React.useCallback((id: string, componentData: T) => {
        updateSettings(prevSettings => {
            const copyPrev = { ...prevSettings };
            _.set(copyPrev, id, componentData);
            layoutBaseRef.current = copyPrev;
            return copyPrev;
        });
    }, []);

    const handlePostUpdate = React.useCallback(
        (id: string, property: string, data: T) => {
            updateSettings(prevSettings => {
                const copyPrev = { ...prevSettings };
                _.set(copyPrev, `${id}.${property}`, data);
                return copyPrev;
            });
        },
        [],
    );

    const handleUpdateClassName = React.useCallback(
        (
            id: string,
            data: {
                [x: string]: string | null;
            },
            ignoreSameValue?: boolean,
        ) => {
            const copyPrev = { ...layoutSettings };

            const componentPath = composeComponentPath(id);
            let { className = '' } = getSettingsById(id, copyPrev);

            Object.entries(data).forEach(([prop, value]) => {
                className = changeClassInString(
                    className,
                    prop,
                    value,
                    ignoreSameValue,
                );
            });

            _.set(copyPrev, `${componentPath}.className`, className);

            updateSettings(copyPrev);
        },
        [layoutSettings],
    );

    const getComponentSettings = React.useCallback(
        (id: string) => getSettingsById(id, layoutSettings),
        [layoutSettings],
    );

    const getComponentClassNames = React.useCallback(
        (id: string) => {
            const { className } = getComponentSettings(id);
            return convertStringToPropertyClass(className || '');
        },
        [layoutSettings],
    );

    return {
        layoutSettings,
        handlePostUpdate,
        handleUpdateClassName,
        getComponentSettings,
        getComponentClassNames,
        handleUpdate,
        handleClose,
        handleCancel,
        handleSave,
        isGuarded: false,
    };
};
