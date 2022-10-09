// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
	interface Locals {
        sql: postgres
    }
	interface PageData {
        items: {
            items,
            tree
        }
    }
	// interface Error {}
	// interface Platform {}
}
