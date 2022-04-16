import { writable } from "svelte/store";

export let user = writable({
    photoURL: undefined,
    uid: undefined,
	roles: {
		premiumUser: false,
		admin: false,
		editor: []
	}
})

export let completedQuestions = writable({
	
})