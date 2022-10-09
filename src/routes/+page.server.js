const addNode = (current, edges) => {
    const children = {}
    edges.filter(e => e.parent === current).forEach(child => {
            children[child.child] = addNode(child.child, edges)
        }
    )
    return children
}

export async function load({locals}) {
    const {sql} = locals

    const items = await sql`SELECT * FROM items;`
    let edges = await sql`SELECT * FROM edges;`
    sql.end()

    // Build tree
    const tree = {}
    const roots = edges.filter(edge => edge.child === edge.parent)
    edges = edges.filter(edge => edge.child !== edge.parent)
    roots.forEach(root => tree[root.parent] = addNode(root.child, edges))

    return {items, tree}
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        try {
            await event.locals.sql`INSERT INTO items (item) values (${data.get("name")});`
        } catch (e) {
            console.log(e)
            return { success: false}
        }
        return { success: true}
    }
};
