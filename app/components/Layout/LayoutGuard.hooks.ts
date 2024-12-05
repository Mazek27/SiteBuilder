import React, { useCallback, useEffect, useState } from 'react';
import { SettingsType } from '~/components/Core/model';
import _ from 'lodash';
import { changeClassInString, updateClassName } from '~/utils/client/className';
import { useFetcher } from '@remix-run/react';
import { useEditMode } from '~/hooks/useEditMode';

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
            property: string | string[],
            newValue: string | string[],
            ignoreSameValue?: boolean,
        ) => {
            const copyPrev = { ...layoutSettings };
            const componentPath = `${id}`;
            const componentSettings = _.get(copyPrev, componentPath, {}) as {
                className?: string;
            };
            let className = componentSettings.className || '';

            const properties = Array.isArray(property) ? property : [property];
            const newValues = Array.isArray(newValue) ? newValue : [newValue];

            properties.forEach((prop, index) => {
                className = changeClassInString(
                    className,
                    prop,
                    newValues[index],
                    ignoreSameValue,
                );
            });
            _.set(copyPrev, `${componentPath}.className`, className);

            updateSettings(copyPrev);
        },
        [layoutSettings],
    );

    const getComponentSettings = React.useCallback(
        (id: string): T => {
            return _.get(layoutSettings, id);
        },
        [layoutSettings],
    );

    return {
        layoutSettings,
        handlePostUpdate,
        handleUpdateClassName,
        getComponentSettings,
        handleUpdate,
        handleClose,
        handleCancel,
        handleSave,
        isGuarded: false,
    };
};
