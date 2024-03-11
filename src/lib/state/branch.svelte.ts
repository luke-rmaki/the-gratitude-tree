import type { MyLeaf } from '../../types';
import { aesGcmDecrypt as decrypt } from '$lib/crypto/decrypt';
import { Temporal } from 'temporal-polyfill';
import { get_passage } from '$lib/utils/passage/get_passage';

export function create_branch() {
	let my_leafs: MyLeaf[] = $state([]);

	function remove_leaf(id: string) {
		my_leafs = my_leafs.filter((leaf) => leaf.id !== id);
	}

	function add_leaf({ content, date, id }: MyLeaf) {
		my_leafs = [{ content, date, id }, ...my_leafs];
	}

	function load_leafs(leafs: MyLeaf[]) {
		my_leafs = leafs;
	}

	async function refresh() {
		const res = await fetch('/api/branch/load');
		const fresh_leafs = await res.json();
		const user_info = await (await get_passage()).getCurrentUser().userInfo();
		const id = user_info?.id as string;
		const temp = [];
		for await (const leaf of fresh_leafs.data) {
			const content = await decrypt(leaf.content, id);
			const my_leaf = { content, date: Temporal.PlainDateTime.from(leaf.date), id: leaf.id };
			temp.push(my_leaf);
		}
		my_leafs = temp;
	}

	return {
		get leafs() {
			return my_leafs;
		},
		remove_leaf,
		add_leaf,
		refresh,
		load_leafs
	};
}

export type Branch = ReturnType<typeof create_branch>;
