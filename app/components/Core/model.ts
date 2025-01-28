import { keyframes } from '@emotion/react';
import { CSSProperties } from 'react';

export type Component<Type, Content> = {
    id: string;
    type?: Type;
    settings?: SettingsType<Content>;
    onClick?: () => void;
};

export type SettingsType<Content> = Content & {
    editable?: boolean;
    locked?: boolean;
    className?: string;
    style?: CSSProperties;
};
