import { Component } from '~/components/Core/model';
import EditContainer from '~/components/Core/EditContainer/EditContainer';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '~/components/Forms/FormInput';
import { FormTextAlignment } from '~/components/Forms/FormTextAlignment';
import { ClassNameUtils } from '~/utils/client/className';

type OwnProps = Component<
    'title',
    {
        text: string;
    }
>;

const defaultClass =
    'grid grid-col-1 grid-row-1 row-start-1 col-start-1 row-end-1 col-end-12';
const defaultText = 'Lorem ipsum dolor sit';

export const Title = (props: OwnProps) => {
    const { settings: { className, text = defaultText } = {}, id } = props;

    const newClassName = ClassNameUtils.updateClassName(
        defaultClass,
        className,
    );

    return (
        <EditContainer id={id} type={'title'}>
            <h1 className={newClassName}>{text}</h1>
        </EditContainer>
    );
};
