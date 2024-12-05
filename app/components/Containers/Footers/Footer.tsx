import { FC } from 'react';
import { Component } from '~/components/Core/model';
import { FooterType } from '~/components/Containers/Footers/Footer.types';
import { heroDefinition as DefaultFooter } from './DefaultFooter/DefaultFooter';

type OwnProps = {
    type?: string;
    settings?: Record<string, Component<any, any>>;
};

const Footers: Record<any, any> = {
    [FooterType.Default]: DefaultFooter,
};

export const Footer = (props: OwnProps) => {
    const { type = FooterType.Default, settings = {} } = props;

    const FooterComponent = Footers[type].component;

    return <FooterComponent settings={settings.footer} />;
};
