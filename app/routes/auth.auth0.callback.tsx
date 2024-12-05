import { type LoaderFunctionArgs } from '@remix-run/node';

import { auth } from '~/utils/server/auth.server';

export let loader = ({ request }: LoaderFunctionArgs) => {
    console.log('auth.auth0.callback.tsx loader');
    return auth.authenticate('auth0', request, {
        successRedirect: '/',
        failureRedirect: '/login',
    });
};
