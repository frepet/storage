<script>
    export let id = 0;
    export let name = "";
    export let children = [];
    export let indent = 0;

    let open = false;

    function toggleOpen() {
        open = !open;
    }
</script>

<style>
    .pointer {
        cursor: pointer;
        user-select: none;
    }
</style>

{#if children.length > 0}
    <h3 class="pointer" style="padding-left: {indent}px" on:click={toggleOpen}>
        {open ? "▼" : "▶"} {name}
    </h3>
{:else}
    <h3 style="padding-left: {indent}px">
        {name}
    </h3>
{/if}

{#if open}
    {#each children as child}
        <svelte:self {...child} indent={indent + 24}/>
    {/each}
{/if}
