import { get_session } from './get_session';
import { goto } from '$app/navigation';

export async function log_out() {
	const session = await get_session();
	await session.signOut();
	document.cookie = 'psg_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	await goto('/');
}
