<script>
    export let data;
    console.log(data.items)
    console.log(data.tree)
</script>

<h1>Storage</h1>
<ul>
    {#each data.items as item}
        <li>{item.item}</li>
    {/each}
</ul>
