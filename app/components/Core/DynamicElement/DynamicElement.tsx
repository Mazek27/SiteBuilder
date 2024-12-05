import * as React from 'react';
import { FC } from 'react';
import { Component } from '../model';
import { Title } from '../Title/Title';
import { Paragraph } from '~/components/Core/Paragraph/Paragraph';
import { Button } from '~/components/Core/Button/Button';
import { Container } from '~/components/Core/Container/Container';
import { TextButton } from '~/components/Core/TextButton/TextButton';

const Components = {
    title: Title,
    paragraph: Paragraph,
    button: Button,
    container: Container,
    textButton: TextButton,
};

type Props = Component<string, any>;
export const DynamicElement: FC<Props> = ({ id, settings }) => {
    let type = settings[id]?.type || settings.type;

    if (!type) {
        return null;
    }

    const DynamicComponent = Components[type] as any;

    if (DynamicComponent) {
        return <DynamicComponent id={id} settings={settings[id] || settings} />;
    }

    return null;
};
