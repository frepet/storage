<script>
    import Context from "./Context.svelte";
    import ComboBox from "./ComboBox.svelte";

    export let id = 0;
    export let name = "";
    export let children = [];
    export let indent = 0;
    export let items = []

    let open = true;

    function toggleOpen() {
        open = !open;
    }

    let newName = ""
    const addItem = () => {
        newName = prompt("Name: ", "");
        console.log("ADD ITEM: " + newName + " to parent: " + id)
    }

    let newParent = undefined
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
        <h4 class="pointer" style="padding-left: {indent}px" on:click={toggleOpen}>
            {open ? "▼" : "▶"} {name}
        </h4>
    {:else}
        <h4 style="padding-left: {indent}px">
            ▷ {name}
        </h4>
    {/if}
    <form method="POST" action="?/insert">
        <input name="id" type="number" value="{id}" hidden/>
        <input name="name" type="text" value="{newName}" hidden/>
        <button on:click={addItem}>+</button>
    </form>
    <Context>
        <form method="POST" action="?/move">
            <input name="child" type="number" value="{id}" hidden/>
            <input name="parent" type="number" value="{newParent}" hidden/>
            <ComboBox
                    label=""
                    name="newParent"
                    placeholder="Move to.."
                    options={items}
                    bind:value={newParent}
            />
            {#if newParent}
                <button>Move</button>
            {/if}
        </form>
    </Context>
</div>

{#if open}
    {#each children as child}
        <svelte:self {...child} indent={indent + 24} items={items}/>
    {/each}
{/if}
