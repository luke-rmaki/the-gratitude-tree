import { aesGcmEncrypt as encrypt } from '$lib/crypto/encrypt.js';
import { get_supabase } from '$lib/utils/supabase.js';
import { Temporal } from 'temporal-polyfill';

export const load = async ({ locals }) => {
	const props = locals.user;

	if (props.is_authorized) {
		const supabase = get_supabase(props.user_id);
		const { data } = await supabase.from('leafs').select().order('date', { ascending: false });
		return {
			leafs: data
		};
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request, locals }) => {
		const data = await request.formData();
		const leaf = data.get('content');
		if (leaf) {
			const value = leaf as string;
			const secret = await encrypt(value, locals.user.user_id);
			const supabase = get_supabase(locals.user.user_id);

			const { error } = await supabase.from('leafs').insert({
				content: secret,
				user_id: locals.user.user_id,
				date: Temporal.Now.plainDateTimeISO()
			});
			console.log(error);
		}
	},
	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id');
		const { error } = await get_supabase(locals.user.user_id).from('leafs').delete().eq('id', id);
		if (!error) {
			console.log(`Deleted ${id}`);
		}
		console.log(error);
	}
};
