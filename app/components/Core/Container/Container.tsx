import { FC, PropsWithChildren } from 'react';
import { Component } from '~/components/Core/model';
import EditContainer from '../EditContainer/EditContainer';
import { updateClassName } from '~/utils/client/className';
import { DynamicElement } from '~/components/Core/DynamicElement/DynamicElement';

type OwnProps = Component<
    'container',
    {
        children: Array<any>;
    }
>;

const defaultClass = 'p-6';

const createChildId = (parentId: string, childId: string, index: number) =>
    `${parentId}.children[${index}].${childId}`;

export const Container = (props: OwnProps) => {
    const { settings: { className, children } = { children: [] }, id } = props;

    const newClassName = updateClassName(defaultClass, className);

    return (
        <EditContainer id={id} type={'container'}>
            <div className={newClassName}>
                {children?.map(({ id: childId, ...childProps }, index) => (
                    <DynamicElement
                        key={childId}
                        id={createChildId(props.id!, childId, index)}
                        settings={childProps}
                    />
                ))}
            </div>
        </EditContainer>
    );
};
