import { auth_req } from '$lib/utils/passage/authenticate_user';
import { get_supabase } from '$lib/utils/supabase';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const props = await auth_req(request);

	if (props.is_authorized) {
		if (request.body) {
			const reader = request.body.getReader(); // Convert to async iterator
			const decoder = new TextDecoder();

			let result = '';
			let run = true;
			try {
				while (run) {
					const { done, value } = await reader.read();
					if (done) {
						run = true;
						break;
					}
					result += decoder.decode(value, { stream: true }); // Decode and append to result
				}
			} finally {
				reader.releaseLock(); // Release the reader lock
			}
			const { id } = JSON.parse(result);
			const { error } = await get_supabase(locals.user.user_id).from('leafs').delete().eq('id', id);
			if (!error) {
				return new Response(JSON.stringify({ message: `${id} deleted` }));
			}
			return new Response(JSON.stringify({ message: `Unable to delete ${id}: ${error}` }));
		}
	} else {
		return new Response(JSON.stringify({ message: 'Unauthorized' }));
	}
	return new Response(JSON.stringify({ message: 'Unable to delete' }));
};
