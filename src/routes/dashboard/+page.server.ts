import { get_user } from '$lib/utils/passage/get_user.js';
import { get_supabase } from '$lib/utils/supabase.js';

export const load = async ({ request }) => {
	const props = await get_user(request);

	if (props.is_authorized) {
		const supabase = get_supabase(props.user_id);
		const { data } = await supabase.from('leafs').select();
		return {
			leafs: data
		};
	}
};
