import { PUBLIC_PASSAGE_APP_ID } from '$env/static/public';
import { Passage, PassageError } from '@passageidentity/passage-js';

export async function is_logged_in() {
	const passage = new Passage(PUBLIC_PASSAGE_APP_ID);
	const user = passage.getCurrentUser();

	try {
		const data = await user.userInfo();
		if (data?.status === 'active') {
			return true;
		}
	} catch (error) {
		if (error instanceof PassageError) {
			if (error.statusCode === 704) {
				return false;
			}
		}
	}
	return false;
}
