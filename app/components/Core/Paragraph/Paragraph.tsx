import { Component } from '~/components/Core/model';
import EditContainer from '../EditContainer/EditContainer';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '~/components/Forms/FormInput';
import { FormTextAlignment } from '~/components/Forms/FormTextAlignment';
import { ClassNameUtils } from '~/utils/client/className';

type OwnProps = Component<
    'paragraph',
    {
        className?: string;
        text?: string;
    }
>;

const defaultClass = 'mt-6 text-lg leading-8 text-gray-600';
const defaultText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const Paragraph = (props: OwnProps) => {
    const { settings: { className, text = defaultText } = {} } = props;

    const newClassName = ClassNameUtils.updateClassName(
        defaultClass,
        className,
    );

    return (
        <EditContainer id={props.id} type={'paragraph'}>
            <h1 className={newClassName} {...props}>
                {text}
            </h1>
        </EditContainer>
    );
};
