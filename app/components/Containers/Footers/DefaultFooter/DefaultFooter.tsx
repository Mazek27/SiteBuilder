import { HeroType } from '~/components/Containers/Heros/Hero.types';
import { Title } from '~/components/Core/Title/Title';
import { Paragraph } from '~/components/Core/Paragraph/Paragraph';
import { Container } from '~/components/Core/Container/Container';
import { FC } from 'react';
import { Component, SettingsType } from '~/components/Core/model';
import { Button } from '~/components/Core/Button/Button';
import { TextButton } from '~/components/Core/TextButton/TextButton';
import { useEditMode } from '~/hooks/useEditMode';

type OwnProps = {
    settings: Record<string, SettingsType<any>>;
};

const DefaultFooter: FC<OwnProps> = props => {
    const { settings = {} } = props;
    const { isEditing, handleSelectElement } = useEditMode();

    return (
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023{' '}
                    <a href="https://flowbite.com/" className="hover:underline">
                        Flowbite™
                    </a>
                    . All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    {settings.navItems?.elements?.map((item, index) => (
                        <li key={index}>
                            <TextButton
                                id={`footer.navItems.${index}`}
                                settings={item}
                            />
                        </li>
                    ))}
                    {isEditing && (
                        <TextButton
                            onClick={() =>
                                handleSelectElement('footer.navItems')
                            }
                            editable={false}
                            settings={{
                                className: 'text-gray-500',
                                text: 'Add Page +',
                            }}
                        />
                    )}
                    {/*<li>*/}
                    {/*    <TextButton>*/}
                    {/*        About*/}
                    {/*    </TextButton>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#" className="hover:underline me-4 md:me-6">*/}
                    {/*        Privacy Policy*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#" className="hover:underline me-4 md:me-6">*/}
                    {/*        Licensing*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <a href="#" className="hover:underline">*/}
                    {/*        Contact*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </footer>
    );
};

export const heroDefinition = {
    name: HeroType.Default,
    component: DefaultFooter,
};
