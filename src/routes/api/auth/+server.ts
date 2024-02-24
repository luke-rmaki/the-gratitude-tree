import { auth_req } from '$lib/utils/passage/authenticate_user';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	const props = await auth_req(request);
	return new Response(JSON.stringify(props));
};
