import { Component } from '~/components/Core/model';
import { parseTailwindClassName } from '~/utils/client/TailwindCssParser';

export const getDefaultSettingValues = <Type, TContent>(
    item: Component<Type, TContent>,
) => {
    if (!item) {
        return {};
    }

    const defaultValues = {};

    switch (item.type) {
        case 'paragraph':
        case 'title':
            defaultValues['text'] = item.text;
            break;
        case 'linkList':
            defaultValues['elements'] = item.elements || [];
            break;
        default:
            break;
    }

    if (item.className) {
        const classNameObject = parseTailwindClassName(item.className);

        for (const key in classNameObject) {
            defaultValues[key] = classNameObject[key];
        }
    }

    return defaultValues;
};
