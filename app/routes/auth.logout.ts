import { redirect, type ActionFunctionArgs } from '@remix-run/node';

import { destroySession, getSession } from '~/utils/server/auth.server';

export const action = async ({ request }: ActionFunctionArgs) => {
    const session = await getSession(request.headers.get('Cookie'));
    const logoutURL = new URL(process.env.AUTH0_LOGOUT_URL as string);

    logoutURL.searchParams.set(
        'client_id',
        process.env.AUTH0_CLIENT_ID as string,
    );
    logoutURL.searchParams.set(
        'returnTo',
        process.env.AUTH0_RETURN_TO_URL as string,
    );

    return redirect(logoutURL.toString(), {
        headers: {
            'Set-Cookie': await destroySession(session),
        },
    });
};
