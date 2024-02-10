// src/routes/+layout.server.ts
export const load = async ({ locals }) => {
	return {
		user: locals.user
	};
};
