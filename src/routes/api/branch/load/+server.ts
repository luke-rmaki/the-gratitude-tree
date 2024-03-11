import { auth_req } from '$lib/utils/passage/authenticate_user';
import { get_supabase } from '$lib/utils/supabase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
	const props = await auth_req(request);
	if (props.is_authorized) {
		const supabase = get_supabase(props.user_id);
		const { data } = await supabase.from('leafs').select().order('date', { ascending: false });
		return new Response(JSON.stringify({ data: data }));
	} else {
		return new Response(JSON.stringify({ message: 'Unauthorized' }));
	}
};
