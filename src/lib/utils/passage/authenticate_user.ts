import Passage from '@passageidentity/passage-node';
import { PUBLIC_PASSAGE_APP_ID } from '$env/static/public';
import { PRIVATE_PASSAGE_API_KEY } from '$env/static/private';

export async function auth_req(req: Request): Promise<{ is_authorized: boolean; user_id: string }> {
	const passage = new Passage({
		appID: PUBLIC_PASSAGE_APP_ID,
		apiKey: PRIVATE_PASSAGE_API_KEY
	});
	try {
		const user_id = await passage.authenticateRequest(req);
		if (user_id) {
			return { is_authorized: true, user_id: user_id };
		}
	} catch (error) {
		// authentication failed
		return { is_authorized: false, user_id: '' };
	}
	return { is_authorized: false, user_id: '' };
}
