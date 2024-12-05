import { keyframes } from '@emotion/react';

export type Component<Type, Content> = {
    id?: string;
    type?: Type;
    editable?: boolean;
    settings?: SettingsType<Content>;
    onClick?: () => void;
};

export type SettingsType<Content> = Content & {
    className?: string;
};
