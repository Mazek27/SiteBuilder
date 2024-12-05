import { Component } from '~/components/Core/model';
import EditContainer from '~/components/Core/EditContainer/EditContainer';
import * as Icons from '@heroicons/react/24/solid';
import { Icon } from '~/components/Core/Icon';
import { FormInput } from '~/components/Forms/FormInput';
import { updateClassName } from '~/utils/client/className';
import { useFormContext } from 'react-hook-form';

type OwnProps = Component<
    'Button',
    {
        text?: string;
        icon?: string;
        buttonType?: 'button' | 'submit' | 'reset';
        onClick?: () => void;
    }
>;

const defaultClass =
    'inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50';
const defaultText = 'Ok';

export const Button = (props: OwnProps) => {
    const {
        id = '',
        settings: {
            className,
            text = props.settings?.icon ? '' : defaultText,
            icon = '',
            buttonType = 'button',
        } = {},
        editable = true,
        onClick = () => {},
    } = props;

    const newClassName = updateClassName(defaultClass, className);

    return (
        <EditContainer
            id={id}
            editable={editable}
            type={'button'}
            defaultValues={{ type: 'button' }}>
            <button
                type={buttonType}
                className={newClassName}
                onClick={onClick}>
                <Icon icon={icon} settings={{ className: 'size-4' }} />
                {text}
            </button>
        </EditContainer>
    );
};
