// src/hooks.server.ts
import { type Handle, redirect } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { get_user } from '$lib/utils/passage/get_user';

/** @type {import('@sveltejs/kit').Handle} */
const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

const authorization: Handle = async ({ event, resolve }) => {
	const props = await get_user(event.request);
	// protect requests to all routes that start with /protected-routes
	if (event.url.pathname.startsWith('/dashboard')) {
		if (!props.is_authorized) {
			// the user is not signed in
			redirect(303, '/');
		}
	}
	if (event.url.pathname.startsWith('/signup')) {
		if (props.is_authorized) {
			redirect(303, '/dashboard');
		}
	}

	return resolve(event);
};

const user: Handle = async ({ event, resolve }) => {
	const props = await get_user(event.request);
	event.locals.user = props;
	return resolve(event);
};

export const handle: Handle = sequence(user, supabase, authorization);
