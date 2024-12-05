import { redirect, type ActionFunctionArgs } from '@remix-run/node';

import { auth } from '~/utils/server/auth.server';

export let loader = () => redirect('/login');

export let action = ({ request }: ActionFunctionArgs) => {
    console.log('auth.auth0.tsx action');
    return auth.authenticate('auth0', request);
};
