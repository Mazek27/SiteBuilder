import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

import { auth, getSession } from '~/utils/server/auth.server';

type LoaderData = {
    error: { message: string } | null;
};

export const loader: LoaderFunction = async ({ request }) => {
    await auth.isAuthenticated(request, { successRedirect: '/' });

    const session = await getSession(request.headers.get('Cookie'));
    const error = session.get(auth.sessionErrorKey) as LoaderData['error'];

    return json<LoaderData>({ error });
};

export default function Login() {
    console.log('Login');
    return (
        <Form method="post" action="/auth/auth0">
            <button>Sign In with Auth0</button>
        </Form>
    );
}
