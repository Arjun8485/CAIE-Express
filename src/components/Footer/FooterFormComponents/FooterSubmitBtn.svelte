<script>
    import FooterLoader from "./FooterLoader.svelte";

    export let showLoader = false
</script>
<button class="bg-red-400 py-3 w-full text-white rounded-md mt-8 flex justify-center {showLoader === true ? '' : "hover:bg-red-500"}" on:click>
    <span>{showLoader === true ? "Submitting" : "Submit!"}</span>
    {#if showLoader}
        <span class="ml-4">
            <FooterLoader />
        </span>
    {/if}
</button>