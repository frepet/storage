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

    console.log(tree)
    return {items, tree}
}
