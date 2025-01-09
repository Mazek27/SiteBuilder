import { Header } from '~/components/Layout/Header/Header';
import {
    Children,
    cloneElement,
    createContext,
    PropsWithChildren,
    useMemo,
    useState,
} from 'react';
import { Auth0Profile } from 'remix-auth-auth0';
import { useLayoutGuard } from '~/components/Layout/LayoutGuard.hooks';
import { useEditMode } from '~/hooks/useEditMode';
import EditBar from '~/components/Layout/EditingBar/EditBar';
import { EditContext } from '~/context/edit.context';

type OwnProps = {
    profile?: Auth0Profile;
    settings: Record<any, any>;
};

const LayoutGuard = ({
    children,
    profile,
    settings,
}: PropsWithChildren<OwnProps>) => {
    return (
        <div className={'bg-white flex h-full flex-col relative'}>
            <Header profile={profile} />
            <div className={'relative isolate px-6 pt-14 lg:px-8 w-full'}>
                {Children.map(children, child =>
                    cloneElement(child as any, { settings }),
                )}
            </div>
        </div>
    );
};

export default ({
    settings,
    profile,
    children,
}: PropsWithChildren<OwnProps>) => {
    const { isEditing, element } = useEditMode();
    const { layoutSettings, ...methods } = useLayoutGuard(settings);

    if (isEditing) {
        return (
            <EditContext.Provider value={{ ...methods } as any}>
                <EditBar />
                <LayoutGuard settings={layoutSettings} profile={profile}>
                    {children}
                </LayoutGuard>
            </EditContext.Provider>
        );
    }

    return (
        <LayoutGuard settings={settings} profile={profile}>
            {children}
        </LayoutGuard>
    );
};
