import { get_supabase } from '$lib/utils/supabase.js';

export const load = async ({ locals }) => {
	const props = locals.user;

	if (props.is_authorized) {
		const supabase = get_supabase(props.user_id);
		const { data } = await supabase.from('leafs').select();
		return {
			leafs: data
		};
	}
};
