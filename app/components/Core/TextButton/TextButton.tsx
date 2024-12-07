import { Component } from '~/components/Core/model';
import EditContainer from '~/components/Core/EditContainer/EditContainer';
import { FormInput } from '~/components/Forms/FormInput';
import { useFormContext } from 'react-hook-form';
import { ClassNameUtils } from '~/utils/client/className';

type OwnProps = Component<
    'TextButton',
    {
        text: string;
    }
>;

const defaultClass =
    'text-sm font-semibold leading-6 text-gray-900 select-none cursor-pointer';
const defaultText = 'Ok';

export const TextButton = (props: OwnProps) => {
    const {
        id = '',
        settings: { className, text = defaultText } = {},
        onClick,
    } = props;

    const newClassName = ClassNameUtils.updateClassName(
        defaultClass,
        className,
    );

    return (
        <EditContainer
            id={id}
            editable={props.editable}
            defaultValues={{ type: 'textButton' }}>
            <span className={newClassName} onClick={onClick}>
                {text}
            </span>
        </EditContainer>
    );
};
