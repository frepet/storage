const addNode = (current, edges, items) => {
    const node = {
        id: current,
        name: items.find(i => i.id === current).name,
        children: []
    }
    edges.filter(e => e.parent === current).forEach(child => {
            node.children.push(addNode(child.child, edges, items))
        }
    )
    return node
}

export async function load({locals}) {
    const {sql} = locals

    const items = await sql`SELECT * FROM items;`
    let edges = await sql`SELECT * FROM edges;`
    sql.end()

    // Build tree
    const tree = []
    const roots = edges.filter(edge => edge.child === edge.parent)
    edges = edges.filter(edge => edge.child !== edge.parent)
    roots.forEach(root => tree.push(addNode(root.child, edges, items)))

    return {tree}
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        try {
            await event.locals.sql`INSERT INTO items (name) values (${data.get("name")});`
        } catch (e) {
            console.log(e)
            return { success: false}
        }
        return { success: true}
    }
};
