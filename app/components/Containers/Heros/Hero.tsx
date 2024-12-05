import { HeroType } from '~/components/Containers/Heros/Hero.types';
import { heroDefinition as DefaultHero } from '~/components/Containers/Heros/DefaultHero/DefaultHero';
import { Component } from '~/components/Core/model';

type OwnProps = {
    type?: string;
    settings?: Record<string, Component<any, any>>;
};

const Heros: Record<any, any> = {
    [HeroType.Default]: DefaultHero,
};

export const Hero = (props: OwnProps) => {
    const { type = HeroType.Default, settings = {} } = props;

    const HeroComponent = Heros[type].component;

    return <HeroComponent settings={settings.hero} />;
};
