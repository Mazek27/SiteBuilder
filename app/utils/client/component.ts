import { SettingsType } from '~/components/Core/model';
import _ from 'lodash';

export const composeComponentPath = (componentId: string) => {
    const splitPath = componentId.split('.');

    if (splitPath.length === 1) {
        return componentId;
    } else {
        return componentId.split('.').slice(0, -1).join('.');
    }
};

export const getSettingsById = (id: string, settings: SettingsType<any>) => {
    const componentPath = composeComponentPath(id);
    return _.get(settings, componentPath, {}) as {
        className?: string;
    };
};
