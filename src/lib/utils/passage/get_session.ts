import { get_passage } from './get_passage';
import { Passage } from '@passageidentity/passage-js';

export async function get_session() {
	const passage = (await get_passage()) as Passage;
	return passage.getCurrentSession();
}
