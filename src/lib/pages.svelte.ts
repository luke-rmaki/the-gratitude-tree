import type { Page } from '../types';

export const page_list: Page[] = [
	{
		name: 'Home',
		path: '/',
		protected: false,
		hide: true
	},
	{
		name: 'Dashboard',
		path: '/dashboard',
		protected: true
	}
];

export function create_pages() {
	let page = $state(page_list[0]);

	function update_page(new_page: string) {
		const the_page = page_list.find((p) => p.path === new_page);
		if (the_page) {
			page = the_page;
		}
	}

	function get_all(logged_in: boolean) {
		if (logged_in) {
			return page_list.filter(
				(p) => p.name !== page.name && p.name !== 'Sign In' && p.name !== 'Sing Up'
			);
		}
		return page_list.filter((p) => p.protected === false && p.name !== page.name);
	}

	return {
		get current_page() {
			return page;
		},
		update_page,
		get_all
	};
}
