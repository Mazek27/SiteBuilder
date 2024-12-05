import { HeroType } from '~/components/Containers/Heros/Hero.types';
import { Title } from '~/components/Core/Title/Title';
import { Paragraph } from '~/components/Core/Paragraph/Paragraph';
import { Container } from '~/components/Core/Container/Container';
import { FC } from 'react';
import { Component, SettingsType } from '~/components/Core/model';
import { Button } from '~/components/Core/Button/Button';
import { TextButton } from '~/components/Core/TextButton/TextButton';

type OwnProps = {
    settings: Record<string, SettingsType<any>>;
};

const DefaultHero: FC<OwnProps> = props => {
    const { settings } = props;

    return (
        <Container id={'hero.container'} settings={settings.container}>
            {/*<div className="hidden sm:mb-8 sm:flex sm:justify-center">*/}
            {/*    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">*/}
            {/*        Announcing our next round of funding.{' '}*/}
            {/*        <a href="#" className="font-semibold text-indigo-600">*/}
            {/*            <span*/}
            {/*                className="absolute inset-0"*/}
            {/*                aria-hidden="true"></span>*/}
            {/*            Read more <span aria-hidden="true">&rarr;</span>*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Title id={'hero.title'} settings={settings.title} />*/}
            {/*    <Paragraph*/}
            {/*        id={'hero.paragraph'}*/}
            {/*        settings={settings.paragraph}*/}
            {/*    />*/}
            {/*</div>*/}
        </Container>
    );
};

export const heroDefinition = {
    name: HeroType.Default,
    component: DefaultHero,
};
