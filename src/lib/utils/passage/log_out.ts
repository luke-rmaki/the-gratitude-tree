import { get_session } from './get_session';
import { goto } from '$app/navigation';

export async function log_out() {
	const session = await get_session();
	await session.signOut();
	await goto('/');
}
