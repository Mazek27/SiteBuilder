import { Component } from '~/components/Core/model';
import EditContainer from '~/components/Core/EditContainer/EditContainer';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '~/components/Forms/FormInput';
import { FormTextAlignment } from '~/components/Forms/FormTextAlignment';
import { updateClassName } from '~/utils/client/className';

type OwnProps = Component<
    'title',
    {
        text: string;
    }
>;

const defaultClass = '';
const defaultText = 'Lorem ipsum dolor sit';

export const Title = (props: OwnProps) => {
    const { settings: { className, text = defaultText } = {}, id } = props;

    const newClassName = updateClassName(defaultClass, className);

    return (
        <EditContainer id={id} type={'title'}>
            <h1 className={newClassName}>{text}</h1>
        </EditContainer>
    );
};
