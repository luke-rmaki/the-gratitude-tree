// utils/supabase.js
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_JWT_SECRET,
	PUBLIC_SUPABASE_URL
} from '$env/static/public';

export function get_supabase(user_id: string) {
	let global;
	if (user_id) {
		const payload = {
			user_id,
			exp: Math.floor(Date.now() / 1000) + 60 * 60
		};
		const token = jwt.sign(payload, PUBLIC_SUPABASE_JWT_SECRET);

		global = {
			headers: {
				Authorization: `Bearer ${token}`
			}
		};
	}

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, { global: global });
	return supabase;
}
