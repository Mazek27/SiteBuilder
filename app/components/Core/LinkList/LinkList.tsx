import { Component } from '~/components/Core/model';
import EditContainer from '~/components/Core/EditContainer/EditContainer';
import { FormInput } from '~/components/Forms/FormInput';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ClassNameUtils } from '~/utils/client/className';
import { TextButton } from '~/components/Core/TextButton/TextButton';
import { Button } from '~/components/Core/Button/Button';

type OwnProps = Component<
    'LinkList',
    {
        elements: Array<{ url: string; label: string }>;
    }
>;

const defaultClass =
    'text-sm font-semibold leading-6 text-gray-900 select-none cursor-pointer';
const defaultText = 'Ok';

export const LinkList = (props: OwnProps) => {
    const {
        id = '',
        settings: { className, elements = [] } = {},
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
            defaultValues={{ type: 'linkList' }}>
            {elements.map(item => (
                <TextButton
                    key={item.url}
                    settings={{ text: item.label, className: newClassName }}
                    onClick={() => window.open(item.url, '_blank')}
                />
            ))}
        </EditContainer>
    );
};
