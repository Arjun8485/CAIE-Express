<script>
    export let actions
    export let selectedAction
</script>

<nav class="w-1/6">
    <div class="bg-red-50 p-4 font-semibold text-red-500 h-full">
        <h5 class="font-bold mt-3 text-center text-2xl">Menu</h5>
        <br>
        {#each actions as action}
            <button class="mt-4 uppercase {selectedAction == action ? 'font-bold' : 'font-normal'}" on:click={() => {selectedAction = action}}>{action}</button>
        {/each}
    </div>
</nav>