// utils/supabase.js
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_ANON_KEY, PRIVATE_SUPABASE_JWT_SECRET } from '$env/static/private';

export function get_supabase(user_id: string) {
	let global;
	if (user_id) {
		const payload = {
			user_id,
			exp: Math.floor(Date.now() / 1000) + 60 * 60
		};
		const token = jwt.sign(payload, PRIVATE_SUPABASE_JWT_SECRET);

		global = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};
	}

	const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SUPABASE_ANON_KEY, { global: global });
	return supabase;
}
