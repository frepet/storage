<script>
    export let id = 0;
    export let name = "";
    export let children = [];
    export let indent = 0;

    let open = false;

    function toggleOpen() {
        open = !open;
    }

    let newName = ""
    const addItem = () => {
        newName = prompt("Name: ", "");
        console.log("ADD ITEM: " + newName + " to parent: " + id)
    }
</script>

<style>
    .pointer {
        cursor: pointer;
        user-select: none;
    }
    .flex {
        display: flex;
    }
</style>

<div class="flex">
    {#if children.length > 0}
        <h3 class="pointer" style="padding-left: {indent}px" on:click={toggleOpen}>
            {open ? "▼" : "▶"} {name}
        </h3>
    {:else}
        <h3 style="padding-left: {indent}px">
            {name}
        </h3>
    {/if}
    <form method="POST">
        <input name="id" type="number" value="{id}" hidden/>
        <input name="name" type="text" value="{newName}" hidden/>
        <button on:click={addItem}>+</button>
    </form>
</div>

{#if open}
    {#each children as child}
        <svelte:self {...child} indent={indent + 24}/>
    {/each}
{/if}
