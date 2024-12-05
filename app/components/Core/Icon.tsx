import { Component } from '~/components/Core/model';
import EditContainer from '~/components/Core/EditContainer/EditContainer';
import * as Icons from '@heroicons/react/24/solid';

type OwnProps = Component<
    'Icon',
    {
        icon?: string;
    }
>;

const defaultClass =
    'inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50';
const defaultText = 'Ok';

export const Icon = (props: OwnProps) => {
    const { settings: { className = defaultClass, icon } = {} } = props;

    const IconComponent = icon ? (Icons as any)[`${icon}Icon`] : null;

    if (!IconComponent) {
        return null;
    }

    return (
        <EditContainer editable={false}>
            <IconComponent className={className} />
        </EditContainer>
    );
};
