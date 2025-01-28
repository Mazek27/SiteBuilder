import { SettingsType } from '~/components/Core/model';
import { StyleUpdates } from '~/models/Style';
import { CSSProperties } from 'react';
import {
    composeComponentPath,
    getSettingsById,
} from '~/utils/client/component';
import _ from 'lodash';

const changeStyle = (
    previousStyle: SettingsType<any>,
    styleUpdates: CSSProperties,
    merge = true,
) => {
    // Create new styles object
    const newStyles: Record<string, string | number> = {};

    if (merge) {
        // Copy existing styles if merging
        Object.assign(newStyles, previousStyle);
    }

    // Update with new styles
    Object.entries(styleUpdates).forEach(([key, value]) => {
        if (value === null || value === undefined) {
            // Remove properties with null/undefined values
            delete newStyles[key];
        } else {
            newStyles[key] = value;
        }
    });

    return newStyles;
};

export const StyleUtils = {
    changeStyle,
};
