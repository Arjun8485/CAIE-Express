<script>
export let footerSelectValue = undefined
export let footerSelectOptions
</script>
<h5 class="font-bold text-red-400">Select one of the following:</h5>

<select bind:value={footerSelectValue} class="w-full bg-red-50 border-b-2 border-red-500 mt-2 py-2">
    {#each footerSelectOptions as footerSelectOption, i}
        <option value={footerSelectOption} class="{i === 0 ? "font-bold" : ""}">{footerSelectOption}</option>
    {/each}
</select>