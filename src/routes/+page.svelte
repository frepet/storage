<script>
    export let data;
    export let form;
</script>

<h1>Storage</h1>
<p>Add Item:</p>
<form method="POST">
    <input name="name" type="text"/>
    <button>Add</button>
    {#if form?.success}
        Item added!
    {:else if form?.success === false}
        Could not add item!
    {/if}
</form>

<ul>
    {#each data.items as item}
        <li>{item.item}</li>
    {/each}
</ul>
