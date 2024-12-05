import {User as UserType} from "~/models/User";
import {Auth0Profile} from "remix-auth-auth0";

export const User = (props: { user?: Auth0Profile}) => {
    const { user } = props;
    return (user?.displayName ? (
                <div className="flex items-center gap-x-4">
                    <span className="text-sm font-semibold leading-6 text-gray-900">Hello, {user.displayName}</span>
                </div>
            ) : (
                <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in</a>
            )
    )
}