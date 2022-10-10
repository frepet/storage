<script>
    import Item from "../components/Item.svelte";

    export let data;
</script>

<h1>Storage</h1>
{#each data.tree as root}
    <Item {...root} items={data.items.map(o => {return {text: o.name, value: o.id}})}/>
{/each}
