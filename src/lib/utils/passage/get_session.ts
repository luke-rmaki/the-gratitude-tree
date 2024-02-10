import { get_passage } from './get_passage';

export async function get_session() {
	const passage = await get_passage();
	return passage.getCurrentSession();
}
