<script>
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher();
    
    export let selectedTopics
    export let isPreview

    import { fly } from 'svelte/transition';
</script>
    
{#if
    selectedTopics.Chemistry.length != 0 || 
    selectedTopics.Physics.length != 0 || 
    selectedTopics.IT.length != 0 ||
    selectedTopics.Biology.length != 0 ||
    selectedTopics.Economics.length != 0 ||
    selectedTopics.Maths_Pure_1.length != 0 ||
    selectedTopics.Maths_Stats_1.length ||
    isPreview 
}
<div class="mt-6 flex sm:flex-row flex-col sm:space-x-4 space-x-0 sm:space-y-0 space-y-2">
    <button on:click={() => dispatch('getQuestions')} class="bg-yellow-400 py-2 px-6 rounded-sm text-white font-bold border-none animate-zoom" in:fly="{{ x: -50, duration: 500 }}">Apply</button>
    <button on:click={() => dispatch('resetFilters')} class="bg-yellow-400 py-2 px-6 rounded-sm text-white font-bold border-none animate-zoom  ml-4" in:fly="{{ x: 50, duration: 500 }}">Reset filters</button>
</div>
{/if}