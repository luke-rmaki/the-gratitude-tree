import { Passage } from '@passageidentity/passage-js';
import { PUBLIC_PASSAGE_APP_ID } from '$env/static/public';

export async function get_passage() {
	const passage = new Passage(PUBLIC_PASSAGE_APP_ID);
	return passage;
}
