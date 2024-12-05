import type {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { PropsWithChildren } from 'react';
import LayoutGuard from '~/components/Layout/LayoutGuard';
import { auth } from '~/utils/server/auth.server';
import { User } from '~/models/User';
import { getSettings, prisma } from '~/.server/db';
import { Hero } from '~/components/Containers/Heros/Hero';
import { getUserId } from '~/utils/server/user.utils';
import { Footer } from '~/components/Containers/Footers/Footer';
import { DynamicElement } from '~/components/Core/DynamicElement/DynamicElement';

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' },
    ];
};

export const loader: LoaderFunction = async ({ request }) => {
    const sessionData = await auth.authenticate('auth0', request);

    if (!sessionData) {
        return {
            status: 401,
            headers: {},
        };
    }

    const userId = getUserId(sessionData.id!);
    const url = new URL(request.url);
    const page = url.pathname;
    const hostname = url.hostname;

    console.log('loader', userId, page, hostname);

    let settings = await getSettings(page, userId, hostname);

    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                page,
                schema: JSON.stringify({
                    '250eaf29-9753-4c80-8bf5-228c206bb586': {
                        type: 'container',
                        className: '',
                        children: [
                            {
                                id: 'bca538b7-9a02-4afc-b77f-9ee1cda45665',
                                text: 'Welcome to Remix!',
                                type: 'title',
                            },
                            {
                                id: '5bb2225b-d708-4bf6-a5db-5194ae5f718c',
                                text: 'Welcome to Remix! This is a starter Remix app.',
                                type: 'paragraph',
                            },
                            {
                                id: '67200a77-0e3f-45e7-a92f-4382dfe6841e',
                                text: 'Get Started',
                                type: 'button',
                                buttonType: 'primary',
                            },
                            {
                                id: 'bf8b21ac-363d-40ba-a645-fe63555ee549',
                                text: 'Learn More',
                                type: 'textButton',
                            },
                        ],
                    },
                }),
                hostname,
                userId,
            },
        });
    }

    settings = JSON.parse(settings.schema!);

    return {
        sessionData,
        settings,
    };
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.clone().formData();
    const actionType = formData.get('actionType');

    console.log('actionType', actionType);
    console.log('formData', formData);
    // Autoryzacja użytkownika
    const sessionData = await auth.authenticate('auth0', request);

    if (!sessionData) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = getUserId(sessionData.id!);

    const url = new URL(request.url);
    const page = url.pathname;
    const hostname = url.hostname;

    console.log('page', userId, page, hostname);

    if (actionType === 'saveSettings') {
        const settingsStr = formData.get('settings');
        if (typeof settingsStr !== 'string') {
            return json({ error: 'Invalid settings format' }, { status: 400 });
        }

        try {
            await prisma.settings.updateMany({
                where: { userId, page, hostname },
                data: { schema: settingsStr },
            });

            console.log('settingsStr', settingsStr);

            return json({ success: true });
        } catch (error) {
            console.error('Error updating settings:', error);
            return json(
                { error: 'Failed to update settings' },
                { status: 500 },
            );
        }
    }

    return json({ error: 'Invalid action type' }, { status: 400 });
};

export default function Index() {
    const { sessionData, settings } = useLoaderData<typeof loader>();

    return (
        <LayoutGuard profile={sessionData} settings={settings}>
            {Object.entries(settings).map(([id, config]) => {
                return <DynamicElement key={id} id={id} settings={config} />;
            })}
        </LayoutGuard>
    );
}
