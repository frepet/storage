<script>
    import Item from "../components/Item.svelte";

    export let data;
</script>

<h1>Storage</h1>
<hr/>
<div class="storageContainer">
    {#each data.tree as root}
        <div class="rootContainer">
            <Item {...root} items={data.items.map(o => {return {text: o.name, value: o.id}})}/>
        </div>
    {/each}
</div>

<style>
    .storageContainer {
        display: flex;
    }

    .rootContainer {
    }
</style>
