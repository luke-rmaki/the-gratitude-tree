// src/hooks.server.ts
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { auth_req } from '$lib/utils/passage/authenticate_user';

/** @type {import('@sveltejs/kit').Handle} */
const authorization: Handle = async ({ event, resolve }) => {
	const props = await auth_req(event.request);

	if (props.is_authorized) {
		// use is logged in
		// maybe something will happen here
	} else {
		// redirect unathorized users to home
		if (event.url.pathname.startsWith('/app')) {
			redirect(303, '/');
		}
	}
	event.locals.user = props;
	return resolve(event);
};

export const handle: Handle = sequence(authorization);
